"use sctrict";

const HTTP = require("http-status");
const ERROR = require("http-errors");
const asyncHandler = require("express-async-handler");
const { httpCodes: { CREATED, UPDATED } } = require("../../tools");
const {
  Teacher: {
    create: { createTeacher },
    add: { addCourses },
    get: { getAll, getById },
    update: { byId, deleteCourses },
  },
} = require("../../services");

const create = asyncHandler(async (req, res, next) => {
  const { body } = req;
  const data = await createTeacher(body);
  if (data) return res.status(HTTP.CREATED).json({ CREATED, data });
  return next(ERROR.BadRequest());
});

const add = asyncHandler(async (req, res, next) => {
  const { id, courses } = req.body;
  const data = await addCourses(id, courses);
  if (data) return res.status(HTTP.OK).json({ CREATED, data });
  return next(ERROR.BadRequest());
});

const findById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const data = await getById(id);
  if (data) return res.status(HTTP.OK).json({ data });
  return next(ERROR.BadRequest());
});

const all = asyncHandler(async (req, res, next) => {
  const {
    page, limit, field, order,
  } = req.query;
  const { data, pagination } = await getAll(page, limit, field, order);
  if (data) return res.status(HTTP.OK).json({ data, pagination });
  return next(ERROR.BadRequest());
});

const update = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  const data = await byId(id, body);
  if (data) return res.status(HTTP.OK).json({ UPDATED });
  return next(ERROR.BadRequest());
});

const deleteCoursesFrom = asyncHandler(async (req, res, next) => {
  const { teacher, course } = req.body;
  const data = await deleteCourses(teacher, course);
  if (data) return res.status(HTTP.OK).json({ UPDATED });
  return next(ERROR.BadRequest());
});

module.exports = {
  deleteCoursesFrom,
  create,
  update,
  findById,
  all,
  add,
};
