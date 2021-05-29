const category = require("./category");
const course = require("./course");
const student = require("./student");
const teacher = require("./teacher");
const payments = require("./payments");
const trash = require("./trash");
const emails = require("./emails");
const auth = require("./auth");
const entities = require("./entities");

module.exports = {
  category,
  payments,
  course,
  entities,
  student,
  teacher,
  trash,
  emails,
  auth,
};
