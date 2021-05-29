"use sctrict";

const { Student } = require("../../models");
const { logger, constants: { USER_TYPES } } = require("../../tools");
const { pagination, students } = require("../../middlewares/masks");

/**
 * @api {get} /student Obtener todo
 * @apiDescription Retornas todos los estudiantes.
 * Retorna un objeto paginado. Query params son opcionales
 * @apiGroup Estudiantes - Admin
 * @ApiParam {QueryParam} page Pagina Pagina del query a obtener
 * @ApiParam {QueryParam} limit Limite de categorías a obtener
 * @ApiParam {QueryParam} field Campo por el cual se ordenará la lista
 * @ApiParam {QueryParam} order Orden ascendente o descendente (-1 desc || 1 asc)
 * @apiExample {curl} Sample usage:
 * curl -X GET \
 * <API_URL>/student?page=1&limit=10&field=createdAt&order=1 \
 * -H 'Content-Type: application/json' \
 * -H 'cache-control: no-cache'
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 20O OK{
 {
    "data": [
        {
            "id_hash": "5f7b69a86b8fc900176a6375",
            "id": 11,
            "user_type": 2,
            "createdAt": "2020-10-05T18:44:56.838Z",
            "email": "prueba@prueba.com",
            "purchased_courses": []
        },
        {
            "id_hash": "5f7b69c76b8fc900176a6376",
            "id": 12,
            "user_type": 2,
            "createdAt": "2020-10-05T18:45:28.077Z",
            "email": "prueba@prueba.com",
            "purchased_courses": []
        },
        {
            "id_hash": "5f7b6c446b8fc900176a6378",
            "id": 13,
            "user_type": 2,
            "createdAt": "2020-10-05T18:56:04.945Z",
            "email": "pruebas@pruebas.com",
            "purchased_courses": []
        },
        {
            "id_hash": "5f7b6d3f6b8fc900176a637a",
            "id": 14,
            "user_type": 2,
            "createdAt": "2020-10-05T19:00:16.074Z",
            "email": "murdoc.jose.6@gmail.com",
            "purchased_courses": []
        },
        {
            "id_hash": "5f7b6d6c6b8fc900176a637b",
            "id": 15,
            "user_type": 2,
            "createdAt": "2020-10-05T19:01:00.476Z",
            "email": "murdoc.jose.7@gmail.com",
            "purchased_courses": []
        }
    ],
    "pagination": {
        "totalDocs": 18,
        "limit": 5,
        "page": 1,
        "nextPage": 2,
        "prevPage": null,
        "totalPages": 4,
        "hasPrevPage": false,
        "hasNextPage": true,
        "pagingCounter": 1
    }
}
}
 * @apiErrorExample {json} Error
 *    HTTP/1.1 400 Bad Request
 * {
    "error": "Bad Request"
  }
 */

/**
 * @api {get} /student/:id Obtener por id
 * @ApiDescription Obtener una estudiante mediante su id
 * @apiGroup Estudiantes - Admin
 * @ApiParam {id} Id student_id Unico del estudiante a obtener
 * @apiExample {curl} Sample usage:
 * curl -X GET \
 * <API_URL>/student/15\
 * -H 'Content-Type: application/json' \
 * -H 'cache-control: no-cache'
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 20O OK{
 {
    "data": {
        "purchased_courses": [],
        "user_type": 2,
        "_id": "5f7b6d6c6b8fc900176a637b",
        "email": "murdoc.jose.7@gmail.com",
        "password": "$2b$10$Zw0perNPf035UBGK74WwM.qJvMCwSXDUDXMFUoPwl3fJmWY9oMmHO",
        "createdAt": "2020-10-05T19:01:00.476Z",
        "updatedAt": "2020-10-05T19:01:00.476Z",
        "student_id": 15,
        "__v": 0
    }
}
}
 * @apiErrorExample {json} Get error
 *    HTTP/1.1 400 Bad Request
 * {
    "error": "Bad Request"
  }
 */

const getAll = async (page, limit, field = "createdAt", order = 1) => {
  const query = {
    user_type: USER_TYPES.STUDENT,
  };

  const options = {
    page: page || 1,
    limit: limit || 5,
    sort: { [field]: order },
    collation: {
      locale: "en",
    },
  };

  const paginate = await Student.paginate(query, options)
    .then(async (result) => result)
    .catch((err) => logger.info(err));

  const data = {
    data: paginate.docs.map((r) => students.allStudents(r)),
    pagination: pagination.paginationLabels(paginate),
  };
  
  return data;
};

const getById = async (id) => {
  const find = await Student.findOne({ student_id: id })
    .then(async (result) => result)
    .catch((err) => logger.info(err));

  // No need to mask before outpout
  return find;
};

module.exports = {
  getAll,
  getById,
};
