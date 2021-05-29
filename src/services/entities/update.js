"use sctrict";

const { Category, Course, Teacher } = require("../../models");
const { logger, constants: { ENTITY_TYPES } } = require("../../tools");

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

const byId = async (id, entity, body) => {
  let update;
  if (entity === ENTITY_TYPES.CATEGORY) {
    update = await Category.updateOne({ category_id: id }, body)
      .then(async (result) => result)
      .catch((err) => logger.info(err));
  } else if (entity === ENTITY_TYPES.COURSE) {
    update = await Course.updateOne({ course_id: id }, body)
      .then(async (result) => result)
      .catch((err) => logger.info(err));
  } else if (entity === ENTITY_TYPES.TEACHER) {
    update = await Teacher.updateOne({ teacher_id: id }, body)
      .then(async (result) => result)
      .catch((err) => logger.info(err));
  }
  return update;
};

module.exports = {
  byId,
};
