const dotenv = require("dotenv");
const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const logger = require("../tools/logger");

const connectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

dotenv.config();
const mongoSrvDBURL = process.env.MONGODB_URL;

const url = mongoSrvDBURL;

mongoose.connect(url, connectionOptions).catch((e) => {
  logger.log({
    level: "error",
    message: "Connection error",
    info: e.message,
  });
});

mongoose.Promise = global.Promise;

const db = mongoose.connection;

autoIncrement.initialize(db);

module.exports = db;
