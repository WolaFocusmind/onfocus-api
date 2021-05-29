"use sctrict";

const HTTP = require("http-status");
const ERROR = require("http-errors");
const asyncHandler = require("express-async-handler");
const { httpCodes: { CREATED, UPDATED } } = require("../../tools");
const {
  Category: {
    create: { createCategory },
    add: { addCourses },
    get: { getAll, getBySlug },
    update: { byId, deleteCourses },
  },
} = require("../../services");

const create = asyncHandler(async (req, res, next) => {
  const { body } = req;
  const data = await createCategory(body);
  if (data) return res.status(HTTP.CREATED).json({ CREATED, data });
  return next(ERROR.BadRequest());
});

const add = asyncHandler(async (req, res, next) => {
  const { id, courses } = req.body;
  const data = await addCourses(id, courses);
  if (data) return res.status(HTTP.OK).json({ CREATED, data });
  return next(ERROR.BadRequest());
});

const bySlug = asyncHandler(async (req, res, next) => {
  const { slug } = req.params;
  const data = await getBySlug(slug);
  if (data) return res.status(HTTP.OK).json({ data });
  return next(ERROR.BadRequest());
});

const all = asyncHandler(async (req, res, next) => {
  const {
    page, limit, field, order, queryField, queryValue,
  } = req.query;
  const { data, pagination } = await getAll(page, limit, field, order, queryField, queryValue);
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
  const { category, course } = req.body;
  const data = await deleteCourses(category, course);
  if (data) return res.status(HTTP.OK).json({ UPDATED });
  return next(ERROR.BadRequest());
});

module.exports = {
  deleteCoursesFrom,
  create,
  update,
  bySlug,
  all,
  add,
};
