"use sctrict";

const {
  Category, Course, Teacher, Trash, Student, Event,
} = require("../../models");
const { logger, constants: { ENTITY_TYPES } } = require("../../tools");

/**
 * @api {get} /all/:entity Obtiene todo
 * @apiDescription Obtiene todos los registros de una entidad sin paginación,
 * con solo su nombre e id.
 * @apiGroup Todo - Admin
 * @ApiParam {Param} entity Entidad que se desea obtener
 * @apiExample {curl} Sample usage:
 * curl -X GET \
 * <API_URL>/all/0 \
 * -H 'Content-Type: application/json' \
 * -H 'cache-control: no-cache'
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 20O OK
 * {
{
    "data": [
        {
            "_id": "5f7424190820e50a6c93ec08",
            "name": "Facebook Ads",
            "course_id": 0
        },
        {
            "_id": "5f7424230820e50a6c93ec09",
            "name": "Marketing Digital Super Experto",
            "course_id": 1
        },
        {
            "_id": "5f7424280820e50a6c93ec0a",
            "name": "Marketing Digital Inicial",
            "course_id": 2
        }
    }
}
 * @apiErrorExample {json} Error
 *    HTTP/1.1 400 Bad Request
 * {
    "error": "Bad Request"
  }
 */

const getAll = async (number) => {
  const entity = parseInt(number, 10);
  let find;

  if (entity === ENTITY_TYPES.CATEGORY) {
    find = await Category.find().select("name category_id")
      .then(async (result) => result)
      .catch((err) => logger.info(err));
  } else if (entity === ENTITY_TYPES.COURSE) {
    find = await Course.find().select("name course_id")
      .then(async (result) => result)
      .catch((err) => logger.info(err));
  } else if (entity === ENTITY_TYPES.TEACHER) {
    find = await Teacher.find().select("full_name teacher_id")
      .then(async (result) => result)
      .catch((err) => logger.info(err));
  } else if (entity === ENTITY_TYPES.STUDENT) {
    find = await Student.find().select("name student_id")
      .then(async (result) => result)
      .catch((err) => logger.info(err));
  } else if (entity === ENTITY_TYPES.TRASH) {
    find = await Trash.find()
      .then(async (result) => result)
      .catch((err) => logger.info(err));
  }

  return find;
};

const getAllEvents = async () => {
  const find = await Event.find()
    .then(async (result) => result)
    .catch((err) => logger.info(err));

  return find;
};

module.exports = {
  getAll,
  getAllEvents,
};
