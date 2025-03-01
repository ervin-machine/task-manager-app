const { status } = require('http-status');
const bcrypt = require("bcryptjs");
const { User } = require('../models');
const ApiError = require('../utils/ApiError');

const seedAdmin = async () => {
  const adminExists = await User.findOne({ email:"admin@taskmanager.com" })

  if(adminExists) {
    console.log('Admin already exists')
    return;
  }

  const hashedPassword = await bcrypt.hash("Admin123", 10);

  const adminUser = new User({
    name: "Admin",
    email: "admin@taskmanager.com",
    password: hashedPassword,
    role: "admin"
  })

  await adminUser.save();
}

const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(status.BAD_REQUEST, 'Email already taken');
  }
  return User.create(userBody);
};

const getUsers = async () => {
  const users = await User.find().sort({ createdAt: -1 });;
  return users;
};

const getUserById = async (id) => {
  return User.findById(id);
};

const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(status.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(status.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(status.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

module.exports = {
  seedAdmin,
  createUser,
  getUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};