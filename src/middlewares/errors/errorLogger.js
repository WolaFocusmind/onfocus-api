const logger = require("../../tools/logger");

const dieGracefully = (error, reason) => {
  /* eslint-disable-next-line */
    console.error(`DYING GRACEFULLY | REASON: ${reason} | ERROR: ${error}`);
  logger.error(`DYING GRACEFULLY | REASON: ${reason} | ERROR: ${JSON.stringify(error)}`);
  process.exit(1);
};

module.exports = {
  dieGracefully,
};
