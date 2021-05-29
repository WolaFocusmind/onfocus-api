"use sctrict";

// required libraries
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const logger = require("./tools/logger");
const { errors } = require("./middlewares");

const app = express();
dotenv.config();

// configurations
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
app.set("appName", "WOLA API");
app.set("trust proxy", true);
app.disable("x-powered-by");
app.disable("etag");
app.use(cookieParser());
app.use(morgan("combined", { stream: { write: (msg) => logger.info(msg.trim()) } }));
app.use(helmet());
app.set("JWT_KEY", process.env.JWT_KEY);
app.use(bodyParser.urlencoded({ extended: true, limit: "20mb" }));
app.use(cors());
app.use(bodyParser.json({
  limit: "20mb",
  verify: (req, res, buff) => {
    req.rawBody = buff;
  },
}));

// mongo database conecction
const db = require("./db");

db.on("error", logger.error.bind(console, "MongoDB connection error:"));

// ---------------- routing ---------------------------------------- //
const routing = require("./routes/routes");

// Allow Cross Allow Origin
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method",
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// api default route
app.get("/", (req, res) => {
  res.render("index", { title: "WOLA" });
});

// api routes
app.use("/api", routing);

// error Handler
app.get("*", errors.handleWildcard);
app.post("*", errors.handleWildcard);
app.use(errors.handleJoiError);
app.use(errors.handleError);

// api port
const apiPort = process.env.NODE_ENV === "production"
  ? process.env.PORT || 80
  : process.env.API_PORT;
// eslint-disable-next-line no-console
app.listen(apiPort, () => logger.info(`Server running on port ${apiPort}`));
