/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
/* eslint-disable security/detect-object-injection */
const dotenv = require("dotenv");
const mercadopago = require("mercadopago");
const { v4: uuid } = require("uuid");
const { logger } = require("../../../tools");

const {
  Course, Purchase, Price,
} = require("../../../models");

dotenv.config();

// add courses, country in checkout params
const checkout = async (courses, country, email, userId = 0) => {
  let token;
  if (process.env.MERCADOPAGO_SANDBOX === "true") {
    token = process.env.MERCADOPAGO_SANDBOX_ACCESS_TOKEN;
  } else {
    // agregar paises en caso de necesitar
    if (country === "MX") { token = process.env.MERCADOPAGO_ACCESS_TOKEN_MX; }
    if (country === "CL") { token = process.env.MERCADOPAGO_ACCESS_TOKEN_CL; }
    if (country === "CO") { token = process.env.MERCADOPAGO_ACCESS_TOKEN_CO; } else {
      token = process.env.MERCADOPAGO_ACCESS_TOKEN;
    }
  }

  mercadopago.configure({
    access_token: token,
  });

  const success = process.env.MERCADOPAGO_URL_SUCCESS;
  const pending = process.env.MERCADOPAGO_URL_PENDING;
  const declined = process.env.MERCADOPAGO_URL_DECLINED;
  // eslint-disable-next-line camelcase
  const notification_url = process.env.MERCADOPAGO_URL_NOTIFICATIONS;
  
  const items = [];

  const generateTransactionId = uuid();
  const transactionId = generateTransactionId;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < courses.length; i++) {
    await Purchase.create({
      user: userId,
      transaction: transactionId,
      method: 0,
      item: courses[i],
      response_log: "",
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
      id: transactionItemId,
      title: findCourse.name,
      description: findCourse.description,
      picture_url: findCourse.featured_image,
      category_id: "course",
      quantity: 1,
      currency_id: findCurrency.currency,
      unit_price: findCurrency.final_price,
    };

    items.push(itemModel);
  }

  // const findStudent = await Course.findOne({ _id: courses[i] })
  //   .then(async (result) => result)
  //   .catch((err) => logger.info(err));

  const preferences = {
    items,
    external_reference: transactionId,
    payer: {
      email,
    },
    payment_methods: {
      excluded_payment_types: [{ id: "atm" }, { id: "ticket" }],
      installments: 1,
    },
    back_urls: {
      success,
      pending,
      failure: declined,
    },
    notification_url,
    auto_return: "approved",
  };

  try {
    const send = await mercadopago.preferences.create(preferences);
    const url = { url: send.body.init_point };
    return url;
  } catch (err) {
    return err.message;
  }
};

module.exports = {
  checkout,
};
