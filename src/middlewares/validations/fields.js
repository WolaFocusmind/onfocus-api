const ERROR = require("http-errors");
const Joi = require("joi");

const joi = Joi.defaults((schema) => {
  const custom = schema.error((error) => {
    if (error[0].isJoiError) return error;
    return ERROR(400, `INVALID_${error[0].local.key.toUpperCase() || "REQUEST"}`, { isJoiError: true });
  });
  custom.prefs({
    abortEarly: true,
    allowUnknown: false,
    errors: {
      render: false,
    },
  });
  return custom;
});

const fields = {
  email: joi.string().email(),
  phone: joi.number(),
  name: joi.string().max(256),
  token: joi.string(),
  username: joi.string().alphanum().min(5).max(40),
  password: joi.string().min(5).max(50),
  object: joi.object,
  array: joi.array,
  string: joi.string(),
  courses: joi.array(),
  text: joi.string(),
  ip: joi.string(),
};
  
module.exports = fields;
