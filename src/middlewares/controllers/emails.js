"use sctrict";

const HTTP = require("http-status");
const ERROR = require("http-errors");
const asyncHandler = require("express-async-handler");
const { httpCodes: { CREATED } } = require("../../tools");
const {
  Emails: {
    emailSender: { sendContactFormEmail, sendContactFormEvent },
  },
} = require("../../services");

const contact = asyncHandler(async (req, res, next) => {
  const {
    name, email, phone, message,
  } = req.body;
  const data = await sendContactFormEmail(name, email, phone, message);
  if (data) return res.status(HTTP.OK).json({ CREATED, data });
  return next(ERROR.BadRequest());
});

const contactEvent = asyncHandler(async (req, res, next) => {
  const {
    name, email, country,
  } = req.body;
  const data = await sendContactFormEvent(name, email, country);
  if (data) return res.status(HTTP.OK).json({ CREATED, data });
  return next(ERROR.BadRequest());
});

module.exports = {
  contact,
  contactEvent,
};
