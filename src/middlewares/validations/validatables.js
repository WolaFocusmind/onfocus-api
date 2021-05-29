/* eslint-disable security/detect-object-injection */
const validatables = ["body", "query", "params"];

const validator = validatables.reduce((prev, curr) => {
  const middleware = (schema) => (req, res, next) => {
    const { value, error } = schema.validate(req[curr]);
    if (error) return next(error);
    res.locals = { ...res.locals, sanitized: { [curr]: value } };
    return next();
  };
  return { ...prev, [curr]: middleware };
}, {});

module.exports = validator;
