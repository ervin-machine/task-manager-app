const { status } = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService } = require('../services');
const { tokenTypes } = require('../config/tokens');
const { Token } = require('../models');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);

  res.cookie("refreshToken", tokens.refresh.token, {
    httpOnly: true,
    secure: false,
    sameSite: "Strict",
  });

  res.status(status.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);

  res.cookie("refreshToken", tokens.refresh.token, {
    httpOnly: true,
    secure: false,
    sameSite: "Strict",
  });

  res.send({ user, tokens });
});

const googleLogin = catchAsync(async (req, res) => {
  try {
    const { credential, client_id } = req.body;
    const user = await authService.loginWithGoogleAuth(credential, client_id);
    const tokens = await tokenService.generateAuthTokens(user);

    res.cookie("refreshToken", tokens.refresh.token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });
    console.log(user, tokens);
    res.send({ user, tokens });
  } catch(err) {
    console.log("Error", err)
    res.status(status.INTERNAL_SERVER_ERROR).send("Failed to authorize with google", err)
  }
})

const logout = catchAsync(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (refreshToken) {
      await Token.findOneAndDelete({ token: refreshToken, type: tokenTypes.REFRESH });
  }

  res.clearCookie("refreshToken");
  res.status(204).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token not found" });
  }

  const tokens = await authService.refreshAuth(refreshToken);
  res.send({ ...tokens });
});

const getMe = catchAsync(async (req, res) => {
  const refreshToken = req.cookies.refreshToken; // Get refresh token from cookie

  if (!refreshToken) {
      return res.status(401).json({ message: "Not authenticated" });
  }

  const tokenDoc = await tokenService.getTokenDoc(refreshToken)

  const isExpired = tokenService.isTokenExpired(tokenDoc);

  if (!isExpired) {
      const user = await userService.getUserById(tokenDoc.user);
      const accessToken = await tokenService.generateAccessToken(user);
      return res.json({ user, ...accessToken });
  }

  await tokenService.deleteDoc(refreshToken)

  const user = await userService.getUserById(tokenDoc.user);
  const newTokens = await tokenService.generateAuthTokens(user);

  res.cookie("refreshToken", newTokens.refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
  });

  res.json({ user, accessToken: newTokens.access.token });
});




module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  getMe,
  googleLogin
};