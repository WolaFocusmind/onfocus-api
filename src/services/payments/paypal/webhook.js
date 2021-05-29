/* eslint-disable camelcase */
/* eslint-disable security/detect-object-injection */
const dotenv = require("dotenv");

const {
  Log,
} = require("../../../models");

dotenv.config();

const receiver = async (body) => {
  await Log.create({
    response_log: JSON.stringify(body),
    type: "paypal-webhook",
  });

  return body;
};

module.exports = {
  receiver,
};
