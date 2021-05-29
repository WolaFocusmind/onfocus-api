/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
/* eslint-disable security/detect-object-injection */
const dotenv = require("dotenv");
// const paypal = require("paypal-rest-sdk");
const paypal = require("@paypal/checkout-server-sdk");
const { logger } = require("../../../tools");

const {
  Log, Purchase, Student, Course,
} = require("../../../models");

const { initProgress } = require("../../course/create");
const { sendPurchasedCoursesEmail } = require("../../emails/emailSender");

dotenv.config();

const processPayment = async (token, PayerID) => {
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
    // TODO implement production keys
    clientId = process.env.PAYPAL_SANDBOX_CLIENT_ID;
    clientSecret = process.env.PAYPAL_SANDBOX_SECRET_KEY;
    environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
    client = new paypal.core.PayPalHttpClient(environment);
  }
    
  const captureOrder = async (orderId) => {
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});
    // Call API with your client and get a response for your call
    const response = await client.execute(request);
    return response;
  };
 
  const capture = await captureOrder(PayerID);

  await Log.create({
    response_log: JSON.stringify(capture),
    type: "paypal-capture-payment",
  });
  
  let getPaymentResult;

  if (capture.result.status === "COMPLETED") {
    // eslint-disable-next-line prefer-destructuring
    getPaymentResult = capture.result.purchase_units[0];
    const getPaymentResultCapture = capture.result.purchase_units[0].payments.captures[0].status;

    await Log.create({
      response_log: JSON.stringify(getPaymentResult),
      type: "payment_result",
    });
 
    const verifyTransaction = await Purchase.findOne(
      {
        transaction: getPaymentResult.reference_id,
        status: 0,
      },
    )
      .then(async (result) => result)
      .catch((err) => logger.info(err));

    if (verifyTransaction && getPaymentResultCapture === "COMPLETED") {
      await Purchase.updateMany({ transaction: getPaymentResult.reference_id },
        {
          status: 1,
        })
        .then(async (result) => result)
        .catch((err) => logger.info(err));

      const findCourse = await Purchase.find({
        transaction: getPaymentResult.reference_id,
        status: 1,
      })
        .then(async (result) => result)
        .catch((err) => logger.info(err));

      const courses = [];
      const coursesTitle = [];
      const user = [];
      // eslint-disable-next-line no-plusplus
      for (let x = 0; x < findCourse.length; x++) {
        courses.push(findCourse[x].item);
        user.push(findCourse[x].user);
      }

      // eslint-disable-next-line no-plusplus
      for (let m = 0; m < courses.length; m++) {
      // eslint-disable-next-line no-await-in-loop
        const findCourseTitle = await Course.findOne({ _id: courses[m] })
          .then(async (result) => result)
          .catch((err) => logger.info(err));
        coursesTitle.push(findCourseTitle.name);
      }

      const findStudent = await Student.findOne({ _id: user[0] })
        .then(async (result) => result)
        .catch((err) => logger.info(err));

      await sendPurchasedCoursesEmail(coursesTitle, findStudent.email,
        findStudent.activated, findStudent.activation_code);

      await initProgress(courses, user);
    }
  }

  return capture;
};

module.exports = {
  processPayment,
};
