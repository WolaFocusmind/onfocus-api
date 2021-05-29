/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
/* eslint-disable security/detect-object-injection */
const dotenv = require("dotenv");

dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { v4: uuid } = require("uuid");
const { logger } = require("../../../tools");

const {
  Course, Purchase, Price,
} = require("../../../models");

// add courses, country in checkout params
const checkout = async (courses, country, email, userId = 0) => {
//   const success = process.env.MERCADOPAGO_URL_SUCCESS;
//   const pending = process.env.MERCADOPAGO_URL_PENDING;
//   const declined = process.env.MERCADOPAGO_URL_DECLINED;
//   // eslint-disable-next-line camelcase
//   const notification_url = process.env.MERCADOPAGO_URL_NOTIFICATIONS;
  
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
    total += findCurrency.final_price;
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total * 100,
    description: "Cursos WOLA Focus Mind",
    receipt_email: email,
    currency: "usd",
    payment_method_types: ["card"],
    metadata: { reference_id: transactionId },
  });

  return paymentIntent;
};

module.exports = {
  checkout,
};
