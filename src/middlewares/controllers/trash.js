"use sctrict";

const HTTP = require("http-status");
const ERROR = require("http-errors");
const asyncHandler = require("express-async-handler");
const { httpCodes: { CREATED, DELETED, UPDATED } } = require("../../tools");
const {
  Trash: {
    send: { sendToTrash },
    deleteTrash: { byId },
    get: { getAll },
    restore: { restoreTrashById },
  },
} = require("../../services");

const sendTo = asyncHandler(async (req, res, next) => {
  const { id, type } = req.body;
  const data = await sendToTrash(id, type);
  if (data) return res.status(HTTP.CREATED).json({ CREATED, data });
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

const restoreById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const data = await restoreTrashById(id);
  if (data) return res.status(HTTP.OK).json({ UPDATED });
  return next(ERROR.BadRequest());
});

const deleteById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const data = await byId(id);
  if (data) return res.status(HTTP.OK).json({ DELETED });
  return next(ERROR.BadRequest());
});

module.exports = {
  all,
  sendTo,
  deleteById,
  restoreById,
};
