const { handleError, handleJoiError, handleWildcard } = require("./errorHandler");
const { dieGracefully } = require("./errorLogger");

module.exports = {
  handleError,
  handleJoiError,
  handleWildcard,
  dieGracefully,
};
