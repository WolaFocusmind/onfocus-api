"use sctrict";

const { Category, Course } = require("../../models");
const { logger } = require("../../tools");

/**
 * @api {post} /category Crear
 * @apiDescription Crear una categoría.
 * @apiGroup Categorias - Admin
 * @ApiParam {String} name Nombre de la categoría (Obligatorio)
 * @ApiParam {Array[]} courses Array con cursos pertenecientes a la categoria (Opcional)
 * @apiExample {json} Input
 *    {
 *      "name": "Nombre de la categría",
 *      "courses": ["...ObjectId de los cursos a agregar dentro de la categoría"]
 *    }
@apiSuccessExample {json} Success
 *    HTTP/1.1 201 Created{
 *   "CREATED": {
 *       "code": 201,
 *       "message": "Created Successfully!"
 *   },
 *   "data": {
 *       "courses": [],
 *       "status": true,
 *       "entity_status": true,
 *       "_id": "5f8cb31875d7123f4454c345",
 *       "slug_history": [
 *           "nombre-de-la-categria"
 *       ],
 *       "name": "Nombre de la categría",
 *       "slug": "nombre-de-la-categria",
 *       "createdAt": "2020-10-18T21:26:49.065Z",
 *       "updatedAt": "2020-10-18T21:26:49.065Z",
 *      "category_id": 23,
 *       "__v": 0
 *  }
 *}
 * @apiErrorExample {json} Error
 *    HTTP/1.1 500 Internal Server Error
 * {
    "error": "INVALID_NAME"
  }
 */

const createCategory = async (body) => {
  const category = new Category(body);
  
  if (category.courses.length) {
    const coursesCategoryId = category.courses;
    
    for (let i = 0; i < coursesCategoryId.length; i += 1) {
      Course.updateOne(
        { _id: coursesCategoryId[`${i}`] },
        // eslint-disable-next-line no-underscore-dangle
        { category: category._id },
        (err, result) => {
          if (err) {
            logger.info(err);
          } else {
            logger.info(result);
          }
        },
      );
    }
  }
  
  return category
    .save()
    .then(() => category)
    .catch((error) => error);
};

module.exports = {
  createCategory,
};
