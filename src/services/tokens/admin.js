"use sctrict";

const express = require("express");

const router = express.Router();
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { USER_TYPES } = require("../../tools/constants");

dotenv.config();

const adminToken = router.use((req, res, next) => {
  const { token } = req.headers;
  
  if (token) {
    // eslint-disable-next-line consistent-return
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.json({ message: "Invalid Token" });
      } if (req.decoded.user_type !== USER_TYPES.ADMIN) {
        return res.json({ message: "Invalid Token. Required admin privileges" });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    res.send({
      message: "Token required super user or admin privileges",
    });
  }
});

module.exports = { adminToken };
