"use sctrict";

const HTTP = require("http-status");
const dotenv = require("dotenv");
const ERROR = require("http-errors");
const asyncHandler = require("express-async-handler");
const { httpCodes: { CREATED, UPDATED } } = require("../../tools");
const {
  Student: {
    get: { getById, getAll },
    update: { byId, activationByCode },
    create: { createStudent },
  },
} = require("../../services");

dotenv.config();

const create = asyncHandler(async (req, res, next) => {
  const { body } = req;
  const data = await createStudent(body);
  if (data) return res.status(HTTP.CREATED).json({ CREATED, data });
  return next(ERROR.BadRequest());
});

const findbyId = asyncHandler(async (req, res, next) => {
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

const activate = asyncHandler(async (req, res, next) => {
  const { code } = req.params;
  const data = await activationByCode(code);
  if (data) return res.redirect(process.env.CLIENT_URL);
  return next(ERROR.BadRequest());
});

module.exports = {
  activate,
  create,
  update,
  findbyId,
  all,
};
