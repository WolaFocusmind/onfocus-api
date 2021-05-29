"use sctrict";

const express = require("express");

const router = express.Router();
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const userToken = router.use((req, res, next) => {
  const { token } = req.headers;

  if (token) {
    // eslint-disable-next-line consistent-return
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.json({ message: "Invalid Token" });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    res.send({
      message: "Token required",
    });
  }
});

module.exports = { userToken };
