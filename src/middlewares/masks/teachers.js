const allTeachers = (row) => ({
  // eslint-disable-next-line no-underscore-dangle
  id_hash: row._id,
  id: row.teacher_id,
  full_name: row.full_name,
  profile_photo: row.profile_photo,
  title: row.title,
  createdAt: row.createdAt,
  status: row.status,
  entity_status: row.entity_status,
  courses: row.courses,
});
  
module.exports = {
  allTeachers,
};
