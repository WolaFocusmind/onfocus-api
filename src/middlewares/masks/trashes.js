const allTrashes = (row) => ({
  // eslint-disable-next-line no-underscore-dangle
  entity_id: row.entity_id,
  name: row.name,
  type: row.type,
  createdAt: row.createdAt,
});
    
module.exports = {
  allTrashes,
};
