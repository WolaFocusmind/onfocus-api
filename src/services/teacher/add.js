"use sctrict";

const { Teacher, Course } = require("../../models");
const { logger } = require("../../tools");

/**
 * @api {put} /category/courses/add Añadir cursos
 * @apiDescription Añadir cursos a un profesor
 * @apiGroup Profesores - Admin
 * @ApiParam {ObjectId} id Id del profesor (Obligatorio)
 * @ApiParam {Array[]} courses Array con los cursos que se añadiran al profesor (Obligatorio)
 * @apiExample {json} Input
 *    {
 *      "id": "5f8e4a0ad4fb1e44180ab2d2",
 *      "courses": ["5f7424190820e50a6c93ec08", "5f7424230820e50a6c93ec09"]
 *    }
@apiSuccessExample {json} Success
 *    HTTP/1.1 20O OK{
{
    "CREATED": {
        "code": 201,
        "message": "Created Successfully!"
    },
    "data": true
}
 * @apiErrorExample {json} Error
 *    HTTP/1.1 400 Bad Request
 * {
    "error": "Bad Request"
  }
 */

const addCourses = async (id, courses) => {
  Teacher.updateOne(
    { _id: id },
    { $addToSet: { courses } },
    (err, result) => {
      if (err) {
        logger.info(err);
      } else {
        logger.info(result);
      }
    },
  );
    
  if (courses.length) {
    const coursesTeacherId = courses;
    
    for (let i = 0; i < coursesTeacherId.length; i += 1) {
      Course.updateOne(
        { _id: coursesTeacherId[`${i}`] },
        { teacher: id },
        (err, result) => {
          if (err) {
            logger.info(err);
          } else {
            logger.info(result);
          }
        },
      );
    }
    return true;
  }
  return false;
};

module.exports = {
  addCourses,
};
