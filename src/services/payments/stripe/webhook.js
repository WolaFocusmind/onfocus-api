/* eslint-disable security/detect-object-injection */
const { logger } = require("../../../tools");

const {
  Log, Purchase, Student, Course,
} = require("../../../models");

const { initProgress } = require("../../course/create");
const { sendPurchasedCoursesEmail } = require("../../emails/emailSender");

const receiver = async (body) => {
  await Log.create({
    response_log: JSON.stringify(body),
    type: "stripe-webhook",
  });

  if (body.type === "payment_intent.succeeded") {
    const getPaymentResult = body.data.object;
 
    const verifyTransaction = await Purchase.findOne(
      {
        transaction: getPaymentResult.metadata.reference_id,
        status: 0,
      },
    )
      .then(async (result) => result)
      .catch((err) => logger.info(err));

    if (verifyTransaction && getPaymentResult.status === "succeeded") {
      await Purchase.updateMany({ transaction: getPaymentResult.metadata.reference_id },
        {
          status: 1,
        })
        .then(async (result) => result)
        .catch((err) => logger.info(err));

      const findCourse = await Purchase.find({
        transaction: getPaymentResult.metadata.reference_id,
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
