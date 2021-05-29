// const Joi = require("joi");
const fields = require("./fields");

// const courses = {
// course: fields.object({
//   name: fields.name.required(),
//   testimonials: fields.array
//     .items({
//       x: fields.string.required(),
//       y: fields.string.required(),
//       z: Joi.string().required(),
//     }),
// }),
// };

const sessions = {
  login: fields.object({
    email: fields.email.optional(),
    username: fields.username.optional(),
    password: fields.password.required(),
    ip: fields.ip.optional(),
  }),
  changePassword: fields.object({
    oldPassword: fields.password.required(),
    newPassword: fields.password.required(),
    newPasswordConfirm: fields.password.required(),
  }),
};

const forms = {
  contactForm: fields.object({
    name: fields.name.optional(),
    email: fields.email.required(),
    phone: fields.phone.optional(),
    message: fields.text.required(),
  }),
};

const categories = {
  category: fields.object({
    name: fields.name.required(),
    courses: fields.courses.optional(),
  }),
};

module.exports = {
  categories,
  sessions,
  forms,
};
