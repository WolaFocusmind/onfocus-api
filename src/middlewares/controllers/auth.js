"use sctrict";

const HTTP = require("http-status");
const ERROR = require("http-errors");
const asyncHandler = require("express-async-handler");
const { httpCodes: { LOGIN, LOGOUT } } = require("../../tools");
const {
  Auth: {
    login: { login },
    logout: { logout },
    password: { changePassword },
  },
} = require("../../services");

const loginUser = asyncHandler(async (req, res, next) => {
  const {
    username, password, email, ipAddress,
  } = req.body;
  const data = await login(username, password, email, ipAddress);
  if (data) return res.status(HTTP.OK).json({ LOGIN, data });
  return next(ERROR.BadRequest());
});

const logoutUser = asyncHandler(async (req, res, next) => {
  const { token } = req.headers;
  const data = await logout(token);
  if (data) return res.status(HTTP.OK).json({ LOGOUT, data });
  return next(ERROR.BadRequest());
});

const changeUserPassword = asyncHandler(async (req, res, next) => {
  const { body: { oldPassword, newPassword, newPasswordConfirm }, decoded: { email } } = req;
  const data = await changePassword(oldPassword, newPassword, newPasswordConfirm, email);
  if (data) return res.status(HTTP.OK).json({ data });
  return next(ERROR.BadRequest());
});
  
module.exports = {
  loginUser,
  logoutUser,
  changeUserPassword,
};
