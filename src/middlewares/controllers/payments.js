"use sctrict";

const dotenv = require("dotenv");
const HTTP = require("http-status");
const ERROR = require("http-errors");
const asyncHandler = require("express-async-handler");
const { httpCodes: { CREATED } } = require("../../tools");
const { Payments } = require("../../services");

dotenv.config();

// const checkout = asyncHandler(async (req, res, next) => {
// //   const { body } = req;
//   const data = await paymentService.checkout();
//   if (data) return res.status(HTTP.CREATED).json({ CREATED, data });
//   return next(ERROR.BadRequest());
// });

const mercadopago = asyncHandler(async (req, res) => {
  const { body } = req;
  res.status(HTTP.OK).json({ CREATED });
  await Payments.mercadopago.webhook.receiver(body);
});

const paypal = asyncHandler(async (req, res) => {
  const { body } = req;
  res.status(HTTP.OK).json({ CREATED });
  await Payments.paypal.webhook.receiver(body);
});

const stripe = asyncHandler(async (req, res) => {
  const { body } = req;
  res.status(HTTP.OK).json({ CREATED });
  await Payments.stripe.webhook.receiver(body);
});

const paypalProcess = asyncHandler(async (req, res, next) => {
  const { paymentId, token, PayerID } = req.query;
  const data = await Payments.paypal.process.processPayment(paymentId, token, PayerID);
  if (data) return res.redirect(process.env.MERCADOPAGO_URL_SUCCESS);
  return next(ERROR.BadRequest());
});

module.exports = {
  paypalProcess,
  mercadopago,
  paypal,
  stripe,
};
