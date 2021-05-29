"use sctrict";

const HTTP = require("http-status");
const ERROR = require("http-errors");
const asyncHandler = require("express-async-handler");
const {
  Entities: {
    get: { getAll, getAllEvents },
    update: { byId },
  },
} = require("../../services");

const all = asyncHandler(async (req, res, next) => {
  const {
    entity,
  } = req.params;
  const data = await getAll(entity);
  if (data) return res.status(HTTP.OK).json({ data });
  return next(ERROR.BadRequest());
});

const updateStatus = asyncHandler(async (req, res, next) => {
  const {
    entity, id,
  } = req.params;
  const { body } = req;
  const data = await byId(id, parseInt(entity, 10), body);
  if (data) return res.status(HTTP.OK).json({ data });
  return next(ERROR.BadRequest());
});

const events = asyncHandler(async (req, res, next) => {
  const data = await getAllEvents();
  if (data) return res.status(HTTP.OK).json({ data });
  return next(ERROR.BadRequest());
});

module.exports = {
  all,
  events,
  updateStatus,
};
