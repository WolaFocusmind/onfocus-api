const paginationLabels = (result) => ({
  totalDocs: result.totalDocs,
  docs: result.itemsList,
  limit: result.limit,
  page: result.page,
  nextPage: result.nextPage,
  prevPage: result.prevPage,
  totalPages: result.totalPages,
  hasPrevPage: result.hasPrevPage,
  hasNextPage: result.hasNextPage,
  pagingCounter: result.pagingCounter,
});

module.exports = {
  paginationLabels,
};
