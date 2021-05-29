/* eslint-disable no-underscore-dangle */

"use sctrict";

/* eslint-disable security/detect-object-injection */
const { v4: uuid } = require("uuid");
const {
  Student,
} = require("../../models");
const {
  hash, logger, constants: { PAYMENTS_GATEWAY }, httpCodes: { DUPLICATED_ERROR },
} = require("../../tools");
const { mercadopago, paypal } = require("../payments");
const stripe = require("../payments/stripe");

/**
 * @api {post} /me/course/buy Comprar
 * @apiDescription Comprar un curso. Este endpoint servirá para comprar un curso.
 * Por los momentos los params son opcionales.
 * @apiGroup Cursos - Publico
 * @ApiParam {Array} courses Curso o cursos a comprar (Obligatorio)
 * @ApiParam {Object} payment Indica si el usuario pago o no el curso (Obligatorio)
 * @apiExample {json} Input
 *    {
    "courses": ["5f7424190820e50a6c93ec08"],
    "payment": true
}
@apiSuccessExample {json} Success
 *    HTTP/1.1 201 Created{
 *   {
    "CREATED": {
        "code": 201,
        "message": "Created Successfully!"
    },
    "data": {
        "n": 1,
        "nModified": 1,
        "opTime": {
            "ts": "6885286252883476482",
            "t": 7
        },
        "electionId": "7fffffff0000000000000007",
        "ok": 1,
        "$clusterTime": {
            "clusterTime": "6885286252883476482",
            "signature": {
                "hash": "e9jaY9T23gvznpi9UOsnhVNP58I=",
                "keyId": "6877718696601583619"
            }
        },
        "operationTime": "6885286252883476482"
    }
}
 *}
 * @apiErrorExample {json} Error
 *    HTTP/1.1 400 Bad request
 * {
    "error": "INVALID_NAME"
  }
 */

const purchaseCourse = async (courses, country, payment, email) => {
  const findUser = await Student.findOne({ email })
    .then(async (result) => result)
    .catch((err) => logger.info(err));

  if (findUser) {
    let purchasedCourses;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < courses.length; i++) {
      purchasedCourses = findUser.purchased_courses.includes(courses[i]);
    }
    
    // eslint-disable-next-line no-underscore-dangle
    if (!purchasedCourses) {
      if (payment === PAYMENTS_GATEWAY.MERCADOPAGO) {
        const paymentURL0 = await mercadopago
          .paymentService.checkout(courses, country, email, findUser._id);
        return paymentURL0;
      }
      if (payment === PAYMENTS_GATEWAY.STRIPE) {
        const paymentCheckout = await stripe
          .paymentService.checkout(courses, country, email, findUser._id);
        return paymentCheckout;
      }
      if (payment === PAYMENTS_GATEWAY.PAYPAL) {
        const paymentURL3 = await paypal
          .paymentService.checkout(courses, country, email, findUser._id);
        return paymentURL3;
      }
    }
    return { state: false, DUPLICATED_ERROR, purchased_courses: findUser.purchased_courses };
  }

  const password = hash.hashPassword("focus12345");
  const createUser = await Student.create({
    email, country, password, activated: false, activation_code: uuid(),
  })
    .then(async (result) => result)
    .catch((err) => logger.info(err));

  if (payment === PAYMENTS_GATEWAY.MERCADOPAGO) {
    const paymentURL0 = await mercadopago
      .paymentService.checkout(courses, country, email, createUser._id);
    return paymentURL0;
  }
  if (payment === PAYMENTS_GATEWAY.STRIPE) {
    const paymentCheckout = await stripe
      .paymentService.checkout(courses, country, email, createUser._id);
    return paymentCheckout;
  }
  if (payment === PAYMENTS_GATEWAY.PAYPAL) {
    const paymentURL3 = await paypal.paymentService
      .checkout(courses, country, email, createUser._id);
    return paymentURL3;
  }
  return false;
};

module.exports = {
  purchaseCourse,
};
