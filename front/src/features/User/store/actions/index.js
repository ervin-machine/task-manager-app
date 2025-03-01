import { userLogin, userRegister, googleLogin, userLogout, getMe } from '../../hooks';
import { types } from "../constants";

const authRequest = (type) => ({
    type,
});

const authSuccess = (type, data) => ({
    type,
    payload: data,
});

const authFailure = (type, error) => ({
    type,
    payload: error,
});

export const registerUser = (newUser) => {
    return async (dispatch) => {
        dispatch(authRequest(types.REGISTER_USER_REQUEST));
        try {
            const response = await userRegister(newUser);
            const { tokens, user } = response.data;

            dispatch(authSuccess(types.REGISTER_USER_SUCCESS, { token: tokens.access, user }));
        } catch (err) {
            console.log(typeof err.response.data)
            const match = err.response.data.match(/Error: (.*?)<br>/);
            const errorMessage = match ? match[1] : "";
            dispatch(authFailure(types.REGISTER_USER_FAILURE, errorMessage));
        }
    };
};

export const loginUser = (existingUser) => {
    return async (dispatch) => {
        dispatch(authRequest(types.LOGIN_USER_REQUEST));
        try {
            const response = await userLogin(existingUser);
            const { tokens, user } = response.data;

            dispatch(authSuccess(types.LOGIN_USER_SUCCESS, { token: tokens.access, user }));
        } catch (err) {
            const match = err.response.data.match(/Error: (.*?)<br>/);
            const errorMessage = match ? match[1] : "";
            dispatch(authFailure(types.LOGIN_USER_FAILURE, errorMessage));
        }
    };
};

export const googleAuth = (credential) => {
    return async (dispatch) => {
        dispatch(authRequest(types.LOGIN_USER_REQUEST));
        try {
            const response = await googleLogin(credential);
            const { tokens, user } = response.data;
            
            dispatch(authSuccess(types.LOGIN_USER_SUCCESS, { token: tokens.access, user }));
        } catch (err) {
            const match = err.response.data.match(/Error: (.*?)<br>/);
            const errorMessage = match ? match[1] : "";
            dispatch(authFailure(types.LOGIN_USER_FAILURE, errorMessage));
        }
    };
};

export const logoutUser = () => {
    return async (dispatch) => {
        try {
            await userLogout();
            dispatch(authSuccess(types.LOGOUT_USER_SUCCESS));
        } catch (err) {
            dispatch(authFailure(types.LOGOUT_USER_FAILURE, err));
        }
    };
};

export const getLoggedUser = () => {
    return async (dispatch) => {
        dispatch(authRequest(types.LOGIN_USER_REQUEST));
        try {
            const response = await getMe();
            const { access, user } = response.data;

            dispatch(authSuccess(types.LOGIN_USER_SUCCESS, { token: access.token, user }));
        } catch (err) {
            console.log(err)
            const match = err.response.data.match(/Error: (.*?)<br>/);
            const errorMessage = match ? match[1] : "";
            dispatch(authFailure(types.LOGIN_USER_FAILURE, errorMessage));
        }
    };
};