"use sctrict";

const { Trash } = require("../../models");
const { logger } = require("../../tools");
const { pagination, trashes } = require("../../middlewares/masks");

const getAll = async (page, limit, field = "createdAt", order = 1, queryField, queryValue) => {
  const query = {
    [queryField]: queryValue,
  };

  const options = {
    page: page || 1,
    limit: limit || 5,
    sort: { [field]: order },
    collation: {
      locale: "en",
    },
  };

  const paginate = await Trash.paginate(query, options)
    .then(async (result) => result)
    .catch((err) => logger.info(err));

  const data = {
    data: paginate.docs.map((r) => trashes.allTrashes(r)),
    pagination: pagination.paginationLabels(paginate),
  };
  
  return data;
};

module.exports = {
  getAll,
};
