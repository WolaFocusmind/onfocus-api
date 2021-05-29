const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const { logger, helpers } = require("../../tools");
const Event = require("../../models/event");

const templates = require("./emailTemplates");

/**
 * @api {post} /contact Contacto
 * @apiDescription Enviar email de contacto
 * @apiGroup Emails - Publico
 * @ApiParam {String} name Nombre del remitente
 * @ApiParam {String} email Email del remitente
 * @ApiParam {String} phone Teléfono del remitente
 * @ApiParam {String} message Mensaje del remitente
 * @apiExample {json} Input
 *    {
       "name": "John Doe",
       "email": "johndoe@gmail.com",
        "phone": "11445566666",
        "message": "Lorem ipsum dolor azimut"
     }
@apiSuccessExample {json} Success
 *    HTTP/1.1 201 Created{
 *   {
    "CREATED": {
        "code": 201,
        "message": "Created Successfully!"
    },
    "data": true
}
 *}
 * @apiErrorExample {json} Error
 *    HTTP/1.1 500 Internal Server Error
 * {
    "error": "INVALID_NAME"
  }
 */

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendContactFormEvent = async (name, email, country) => {
  const body = {
    name, email, country,
  };

  const event = new Event(body);
  event
    .save()
    .then(() => event)
    .catch((error) => error);
    
  const info = await transporter.sendMail({
    from: "marketingfmind@gmail.com",
    to: `marketingfmind@gmail.com, ${email}`,
    subject: "Focus Mind | Digital Mind Live",
    text: "Focus Mind | Digital Mind Live",
    html: templates.contactFormEmailEvent(name, email, country),
  });

  logger.info("Message sent: %s", info.messageId);
  return true;
};

const sendContactFormEmail = async (name, email, phone, message) => {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.SOURCE_EMAIL,
    to: process.env.SOURCE_EMAIL,
    subject: "Formulario de Contacto",
    text: "Formulario de Contacto WOLA",
    html: templates.contactFormEmail(name, email, phone, message),
  });

  logger.info("Message sent: %s", info.messageId);
  return true;
};

const sendPurchasedCoursesEmail = async (courses, email, activation, code) => {
  let info;
  const link = `${process.env.API_URL}api/activation/${code}`;
  const coursesTitle = helpers.formatArrayToString(courses);

  if (activation) {
  // send mail with defined transport object
    info = await transporter.sendMail({
      from: process.env.SOURCE_EMAIL,
      to: email,
      subject: "Gracias por tu compra.",
      text: "Haz adquirido cursos en FocusMind",
      html: templates.purchasedCoursesNoActivation(email, coursesTitle),
    });
  } else {
    info = await transporter.sendMail({
      from: process.env.SOURCE_EMAIL,
      to: email,
      subject: "Gracias por tu compra. Debes ahora activar tu cuenta",
      text: "Termina de activar tu cuenta",
      html: templates.purchasedCoursesWithActivation(email, coursesTitle, link),
    });
  }
  logger.info("Message sent: %s", info.messageId);
  return true;
};

module.exports = {
  sendContactFormEmail,
  sendPurchasedCoursesEmail,
  sendContactFormEvent,
};
