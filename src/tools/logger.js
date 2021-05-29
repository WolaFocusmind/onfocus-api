const winston = require("winston");
const dotenv = require("dotenv");

dotenv.config();

const errorStackTracerFormat = winston.format((info) => {
  const formatedInfo = { ...info };
  if (info instanceof Error) formatedInfo.message = `${info.message} ${info.stack}`;
  return formatedInfo;
});

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.splat(), // Necessary to produce the 'meta' property
    errorStackTracerFormat(),
    winston.format.simple(),
  ),
  defaultMeta: { service: "onfocus-backend" },
  transports: [
    new winston.transports.File({ filename: "./src/logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "./src/logs/debug.log", level: "debug" }),
    new winston.transports.File({ filename: "./src/logs/combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(new winston.transports.Console({
    format:
            winston.format.combine(
              winston.format.colorize(),
              winston.format.simple(),
            ),
  }));
}

module.exports = logger;
