"use sctrict";

const express = require("express");

const router = express.Router();
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { USER_TYPES } = require("../../tools/constants");

dotenv.config();

const teacherToken = router.use((req, res, next) => {
  const { token } = req.headers;
  
  if (token) {
    // eslint-disable-next-line consistent-return
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.json({ message: "Invalid Token" });
      } if (req.decoded.user_type !== USER_TYPES.TEACHER) {
        return res.json({ message: "Invalid Token. Required teacher or admin privileges" });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    res.send({
      message: "Token required teacher or admin privileges",
    });
  }
});
  
module.exports = { teacherToken };
