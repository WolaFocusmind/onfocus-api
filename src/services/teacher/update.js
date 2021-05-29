"use sctrict";

const { Teacher, Course } = require("../../models");
const { logger, store } = require("../../tools");

/**
 * @api {put} /teacher/:id Actualizar
 * @apiDescription Actualizar un profesor ya creado. Incluyendo su estado y otros campos.
 * @apiGroup Profesor - Admin
 *
 * @ApiParam {id} teacher_id teacher_id autoincremental del profesor a actualizar
 * @ApiParam {Object} Body Body con todos los campos a actualizar del profesor
 * @apiExample {json} Input
 *    {
       "name": "Pablo Perez Alvarez",
       "status": false,
      "entity_status": false
 *    }
@apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK {
 *   {
    "UPDATED": {
        "code": 200,
        "message": "Updated Successfully!"
    }
}
 *}
 * @apiErrorExample {json} Error
 *    HTTP/1.1 400 Bad Request
 * {
    "error": "Bad Request"
  }
 */

/**
 * @api {put} /teacher/courses/delete Borrar cursos
 * @apiDescription  Borrar cursos pertenecientes a un profesor.
 * @apiGroup Profesores - Admin
 * @ApiParam {ObjectId} teacher ObjectId del profesor
 * @ApiParam {ObjectId} course Curso a eliminar del profesor
 * @apiParamExample {json} Input
 *    {
       "teacher": "5f8e4a0ad4fb1e44180ab2d2",
       "course": "5f7424190820e50a6c93ec08"
 *    }
@apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK {
 *   {
    "UPDATED": {
        "code": 200,
        "message": "Updated Successfully!"
    }
}
 *}
 * @apiErrorExample {json} Error
 *    HTTP/1.1 400 Bad Request
 * {
    "error": "Bad Request"
  }
 */

const byId = async (id, body) => {
  const teacherBody = body;

  if (body.profile_photo) {
    const buf = Buffer.from(body.profile_photo.replace(/^data:image\/\w+;base64,/, ""), "base64");
    const assetStore = await store.store(buf);

    teacherBody.profile_photo = assetStore.Location;
  }

  const update = await Teacher.updateOne({ teacher_id: id }, body)
    .then(async (result) => result)
    .catch((err) => logger.info(err));
  return update;
};

const deleteCourses = async (teacher, course) => {
  const deleteFromTeacher = await Teacher
    .updateOne({ _id: teacher }, { $pull: { courses: course } })
    .then(async (result) => result)
    .catch((err) => logger.info(err));

  const deleteFromCourse = await Course
    .updateOne({ _id: course }, { $unset: { teacher } })
    .then(async (result) => result)
    .catch((err) => logger.info(err));

  return { deleteFromTeacher, deleteFromCourse };
};

module.exports = {
  byId,
  deleteCourses,
};
