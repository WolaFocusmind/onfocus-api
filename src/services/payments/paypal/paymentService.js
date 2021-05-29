/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
/* eslint-disable security/detect-object-injection */
const dotenv = require("dotenv");
// const paypal = require("paypal-rest-sdk");
const paypal = require("@paypal/checkout-server-sdk");
const { v4: uuid } = require("uuid");
const { logger } = require("../../../tools");

const {
  Course, Purchase, Price, Log,
} = require("../../../models");

dotenv.config();

const checkout = async (courses, country, email, userId = 0) => {
  let clientId;
  let clientSecret;
  let environment;
  let client;
  if (process.env.PAYPAL_MODE === "sandbox") {
    clientId = process.env.PAYPAL_SANDBOX_CLIENT_ID;
    clientSecret = process.env.PAYPAL_SANDBOX_SECRET_KEY;
    environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
    client = new paypal.core.PayPalHttpClient(environment);
  } else {
    clientId = process.env.PAYPAL_LIVE_CLIENT_ID;
    clientSecret = process.env.PAYPAL_LIVE_SECRET_KEY;
    environment = new paypal.core.LiveEnvironment(clientId, clientSecret);
    client = new paypal.core.PayPalHttpClient(environment);
  }

  const success = process.env.PAYPAL_PROCESS;
  const declined = process.env.MERCADOPAGO_URL_DECLINED;
  // eslint-disable-next-line camelcase

  const items = [];
  let total = 0;

  const generateTransactionId = uuid();
  const transactionId = generateTransactionId;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < courses.length; i++) {
    await Purchase.create({
      user: userId,
      transaction: transactionId,
      method: 0,
      item: courses[i],
    })
      .then(async (result) => result)
      .catch((err) => logger.info(err));

    const findCourse = await Course.findOne({ _id: courses[i] })
      .then(async (result) => result)
      .catch((err) => logger.info(err));

    const findCurrency = await Price.findOne({ course: findCourse._id, country })
      .then(async (result) => result)
      .catch((err) => logger.info(err));
    
    const transactionItemId = uuid();

    const itemModel = {
      sku: transactionItemId,
      name: findCourse.name,
      unit_amount: {
        currency_code: findCurrency.currency,
        value: findCurrency.final_price,
      },
      quantity: "1",
    };

    items.push(itemModel);
    total += findCurrency.final_price;
  }

  const paymentOrder = {
    intent: "CAPTURE",
    payer: {
      payment_method: "paypal",
    },
    application_context: {
      return_url: success,
      cancel_url: declined,
      brand_name: "Focus Mind",
      locale: "en-US",
      landing_page: "BILLING",
      shipping_preference: "NO_SHIPPING",
      user_action: "CONTINUE",
    },
    purchase_units: [
      {
        reference_id: transactionId,
        description: "Compra Cursos Digitales Focus Mind WOLA",

        custom_id: transactionId,
        soft_descriptor: "WOLA Cursos",
        amount: {
          currency_code: "USD",
          value: total,
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: total,
            },
          },
        },
        items,
      },
    ],
  };

  const request = new paypal.orders.OrdersCreateRequest();

  request.requestBody(paymentOrder);

  const response = await client.execute(request);

  await Log.create({
    response_log: JSON.stringify(response),
    type: "paypal-order-created",
  });

  const links = {};
  response.result.links.forEach((link) => {
    links[link.rel] = {
      href: link.href,
      method: link.method,
    };
  });

  const url = { url: links.approve.href };

  return url;
};

module.exports = {
  checkout,
};
