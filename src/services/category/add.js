"use sctrict";

const { Category, Course } = require("../../models");
const { logger } = require("../../tools");

/**
 * @api {put} /category/courses/add Añadir cursos
 * @apiDescription Añadir cursos a una categoría
 * @apiGroup Categorias - Admin
 * @ApiParam {ObjectId} id Id de la categoría (Obligatorio)
 * @ApiParam {Array[]} courses Array con los cursos que se añadiran a la categoria (Obligatorio)
 * @apiExample {json} Input
 *    {
 *      "id": "5f8cb31875d7123f4454c345",
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
  Category.updateOne(
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
    const coursesCategoryId = courses;
    
    for (let i = 0; i < coursesCategoryId.length; i += 1) {
      Course.updateOne(
        { _id: coursesCategoryId[`${i}`] },
        { category: id },
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
