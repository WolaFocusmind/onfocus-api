const ERROR = require("http-errors");
const { dieGracefully } = require("./errorLogger");

const handleJoiError = (err, req, res, next) => next(err);

/* eslint-disable no-unused-vars */
const handleError = (err, req, res, next) => {
  if (err.status) return res.status(err.status).json({ error: err.message });
  res.status(500).end();
  return dieGracefully(err, "unknownError");
};

const handleWildcard = (req, res, next) => next(ERROR.NotFound("Not Found"));

module.exports = {
  handleJoiError,
  handleError,
  handleWildcard,
};
