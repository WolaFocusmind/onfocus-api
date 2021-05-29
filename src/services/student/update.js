"use sctrict";

const { Student } = require("../../models");
const { logger } = require("../../tools");

/**
 * @api {put} /student/:id Actualizar
 * @apiDescription Actualizar un estudiante ya creado.
 * @apiGroup Estudiantes - Admin
 *
 * @ApiParam {id} student_id student_id autoincremental del estudiante a actualizar
 * @ApiParam {Object} Body Body con todos los campos a actualizar del estudiante
 * @apiExample {json} Input
 *    {
       "name": "Juan Perez"
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
  const update = await Student.updateOne({ student_id: id }, body)
    .then(async (result) => result)
    .catch((err) => logger.info(err));
  return update;
};

const activationByCode = async (code) => {
  const update = await Student.updateOne({ activation_code: code }, { activated: true })
    .then(async (result) => result)
    .catch((err) => logger.info(err));
  return update;
};

module.exports = {
  byId,
  activationByCode,
};
