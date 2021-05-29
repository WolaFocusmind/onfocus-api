"use sctrict";

const { Category, Course } = require("../../models");
const { logger } = require("../../tools");

/**
 * @api {put} /category/:id Actualizar
 * @apiDescription Actualizar una categoría ya creada. Incluyendo su estado y otros campos.
 * @apiGroup Categorias - Admin
 *
 * @ApiParam {id} category_id category_id autoincremental de la categoría a actualizar
 * @ApiParam {Object} Body Body con todos los campos a actualizar de la categoría
 * @apiExample {json} Input
 *    {
       "name": "Nombre de la categría",
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
 * @api {put} /category/courses/delete Borrar cursos
 * @apiDescription  Borrar cursos pertenecientes a una categoría.
 * @apiGroup Categorias - Admin
 * @ApiParam {ObjectId} category ObjectId de la categoria
 * @ApiParam {ObjectId} course Curso a eliminar de la categoria
 * @apiParamExample {json} Input
 *    {
       "category": "5f8cb31875d7123f4454c345",
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
  const update = await Category.updateOne({ category_id: id }, body)
    .then(async (result) => result)
    .catch((err) => logger.info(err));
  return update;
};

const deleteCourses = async (category, course) => {
  const deleteFromCategory = await Category
    .updateOne({ _id: category }, { $pull: { courses: course } })
    .then(async (result) => result)
    .catch((err) => logger.info(err));

  const deleteFromCourse = await Course
    .updateOne({ _id: course }, { $unset: { category } })
    .then(async (result) => result)
    .catch((err) => logger.info(err));

  const data = { deleteFromCategory, deleteFromCourse };

  return data;
};

module.exports = {
  byId,
  deleteCourses,
};
