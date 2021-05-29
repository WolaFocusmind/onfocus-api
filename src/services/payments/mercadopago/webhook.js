/* eslint-disable security/detect-object-injection */
const dotenv = require("dotenv");
const mercadopago = require("mercadopago");
const { logger } = require("../../../tools");

const {
  Log, Purchase, Student, Course,
} = require("../../../models");

const { initProgress } = require("../../course/create");
const { sendPurchasedCoursesEmail } = require("../../emails/emailSender");

dotenv.config();

const receiver = async (body) => {
  await Log.create({
    response_log: JSON.stringify(body),
    type: "mercadopago-webhook",
  });

  let token;
  let getPaymentResult;
  if (process.env.MERCADOPAGO_SANDBOX === "true") {
    token = process.env.MERCADOPAGO_SANDBOX_ACCESS_TOKEN;
  } else {
    token = process.env.MERCADOPAGO_ACCESS_TOKEN;
  }

  if (body.action === "payment.created") {
    mercadopago.configure({
      access_token: token,
    });
    const { id } = body.data;
    const paymentId = id;
  
    getPaymentResult = await mercadopago.payment.capture(paymentId, mercadopago)
      .then(async (result) => result)
      .catch((err) => logger.info(err));
  
    getPaymentResult = getPaymentResult.body;

    await Log.create({
      response_log: JSON.stringify(getPaymentResult),
      type: "payment_result",
    });
 
    const verifyTransaction = await Purchase.findOne(
      {
        transaction: getPaymentResult.external_reference,
        status: 0,
      },
    )
      .then(async (result) => result)
      .catch((err) => logger.info(err));

    if (verifyTransaction && getPaymentResult.status === "approved" && getPaymentResult.status_detail === "accredited") {
      await Purchase.updateMany({ transaction: getPaymentResult.external_reference },
        {
          status: 1,
        })
        .then(async (result) => result)
        .catch((err) => logger.info(err));

      const findCourse = await Purchase.find({
        transaction: getPaymentResult.external_reference,
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
  return body;
};

module.exports = {
  receiver,
};
