"use sctrict";

const HTTP = require("http-status");
const ERROR = require("http-errors");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { httpCodes: { CREATED, UPDATED } } = require("../../tools");
const {
  Course: {
    create: { createCourse },
    get: {
      getBySlug, getById, getAll, getMyCourseBySlug, getAllMyCourses,
      getMyCourseModules, getAllAdmin,
    },
    buy: { purchaseCourse },
    update: { byId, pushProgress },
  },
} = require("../../services");

const create = asyncHandler(async (req, res, next) => {
  const { body } = req;
  const data = await createCourse(body);
  if (data) return res.status(HTTP.CREATED).json({ CREATED, data });
  return next(ERROR.BadRequest());
});

const buy = asyncHandler(async (req, res, next) => {
  const {
    courses, country, payment,
  } = req.body;
  let email;
  if (req.headers.token) {
    const token = jwt.verify(req.headers.token, process.env.JWT_KEY);
    email = token.email;
  } else {
    email = req.body.email;
  }
  const data = await purchaseCourse(courses, country, payment, email || email.email);
  if (data) return res.status(HTTP.OK).json({ CREATED, data });
  return next(ERROR.BadRequest());
});

const bySlug = asyncHandler(async (req, res, next) => {
  const { slug } = req.params;
  const data = await getBySlug(slug);
  if (data) return res.status(HTTP.OK).json({ data });
  return next(ERROR.BadRequest());
});

const getOneById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const data = await getById(id);
  if (data) return res.status(HTTP.OK).json({ data });
  return next(ERROR.BadRequest());
});

const all = asyncHandler(async (req, res, next) => {
  const {
    page, limit, field, order, queryField, queryValue,
  } = req.query;
  // eslint-disable-next-line max-len
  const { data, paginate } = await getAll(page, limit, field, order, queryField, queryValue);
  if (data) return res.status(HTTP.OK).json({ data, paginate });
  return next(ERROR.BadRequest());
});

const adminAll = asyncHandler(async (req, res, next) => {
  const {
    page, limit, field, order, queryField, queryValue,
  } = req.query;
  const { data, paginate } = await getAllAdmin(page, limit, field, order, queryField, queryValue);
  if (data) return res.status(HTTP.OK).json({ data, paginate });
  return next(ERROR.BadRequest());
});

const getMeBySlug = asyncHandler(async (req, res, next) => {
  const { slug } = req.params;
  const { id } = req.decoded;
  const data = await getMyCourseBySlug(slug, id);
  if (data) return res.status(HTTP.OK).json({ data });
  return next(ERROR.BadRequest());
});

const getMeAll = asyncHandler(async (req, res, next) => {
  const {
    page, limit, field, order,
  } = req.query;
  const { id } = req.decoded;
  const { data, paginate } = await getAllMyCourses(id, page, limit, field, order);
  if (data) return res.status(HTTP.OK).json({ data, paginate });
  return next(ERROR.BadRequest());
});

const getModules = asyncHandler(async (req, res, next) => {
  const { slug } = req.params;
  const { id } = req.decoded;
  const data = await getMyCourseModules(slug, id);
  if (data) return res.status(HTTP.OK).json({ data });
  return next(ERROR.BadRequest());
});

const update = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  const data = await byId(id, body);
  if (data) return res.status(HTTP.OK).json({ UPDATED });
  return next(ERROR.BadRequest());
});

const updateProgess = asyncHandler(async (req, res, next) => {
  const { id } = req.decoded;
  const courseId = req.params.id;
  const { body } = req;
  const data = await pushProgress(id, courseId, body);
  if (data) return res.status(HTTP.OK).json({ UPDATED });
  return next(ERROR.BadRequest());
});

module.exports = {
  adminAll,
  getMeBySlug,
  getMeAll,
  getModules,
  create,
  update,
  bySlug,
  all,
  getOneById,
  buy,
  updateProgess,
};
