const allCategories = (row) => ({
  // eslint-disable-next-line no-underscore-dangle
  id_hash: row._id,
  id: row.category_id,
  name: row.name,
  slug: row.slug ? row.slug : "",
  createdAt: row.createdAt,
  status: row.status,
  entity_status: row.entity_status,
  courses: row.courses,
});

module.exports = {
  allCategories,
};
