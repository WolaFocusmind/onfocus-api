const allStudents = (row) => ({
  // eslint-disable-next-line no-underscore-dangle
  id_hash: row._id,
  id: row.student_id,
  user_type: row.user_type,
  name: row.name,
  createdAt: row.createdAt,
  username: row.username,
  email: row.email,
  country: row.country,
  status: row.status,
  entity_status: row.entity_status,
  purchased_courses: row.purchased_courses,
});
  
module.exports = {
  allStudents,
};
