"use sctrict";

const { Teacher, Course } = require("../../models");
const { logger, constants: { STATUS } } = require("../../tools");
const { pagination, teachers } = require("../../middlewares/masks");

/**
 * @api {get} /teacher Obtener todo
 * @apiDescription Retornas todas los profesores.
 * Retorna un objeto paginado. Query params son opcionales
 * @apiGroup Profesores - Admin
 * @ApiParam {QueryParam} page Pagina Pagina del query a obtener
 * @ApiParam {QueryParam} limit Limite de categorías a obtener
 * @ApiParam {QueryParam} field Campo por el cual se ordenará la lista
 * @ApiParam {QueryParam} order Orden ascendente o descendente (-1 desc || 1 asc)
 * @apiExample {curl} Sample usage:
 * curl -X GET \
 * <API_URL>/teacher?page=1&limit=10&field=createdAt&order=1 \
 * -H 'Content-Type: application/json' \
 * -H 'cache-control: no-cache'
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 20O OK
 * {
   {
    "data": [
        {
            "id_hash": "5f75d9cb81a9980017f37414",
            "id": 0,
            "full_name": "John Doe",
            "title": "Maestro",
            "createdAt": "2020-10-01T13:29:47.618Z",
            "status": true,
            "entity_status": true,
            "courses": [
                {
                    "_id": "5f7424190820e50a6c93ec08",
                    "name": "Facebook Ads",
                    "slug": "facebook-ads"
                },
                {
                    "_id": "5f7424230820e50a6c93ec09",
                    "name": "Marketing Digital Super Experto",
                    "slug": "marketing-digital-experto"
                },
                {
                    "_id": "5f7424f60820e50a6c93ec0d",
                    "name": "Como ser tu propio Jefe",
                    "slug": "como-ser-tu-propio-jefe"
                }
            ]
        },
        {
            "id_hash": "5f75db1181a9980017f37417",
            "id": 1,
            "full_name": "Maria Doe",
            "title": "Full Stack Developer",
            "createdAt": "2020-10-01T13:35:13.080Z",
            "status": true,
            "entity_status": true,
            "courses": [
                {
                    "_id": "5f75daa93e77a6345c6e8343",
                    "name": "React desde Cero",
                    "slug": "react-desde-cero"
                },
                {
                    "_id": "5f74a2fb528c5145487efaba",
                    "name": "Angular desde Cero",
                    "slug": "angular-desde-cero"
                }
            ]
        },
        {
            "id_hash": "5f75db5681a9980017f37418",
            "id": 2,
            "full_name": "Pepper Pots",
            "title": "Analista",
            "createdAt": "2020-10-01T13:36:22.661Z",
            "status": true,
            "entity_status": true,
            "courses": [
                {
                    "_id": "5f74251d0820e50a6c93ec0e",
                    "name": "SCRUM desde Cero",
                    "slug": "scrum-desde-cero"
                }
            ]
        },
        {
            "id_hash": "5f86e755aa33e800179ceab6",
            "id": 14,
            "full_name": "Marina S",
            "title": "Diseñadora",
            "createdAt": "2020-10-14T11:56:05.999Z",
            "status": true,
            "entity_status": true,
            "courses": []
        },
        {
            "id_hash": "5f8e4a0ad4fb1e44180ab2d2",
            "id": 15,
            "full_name": "Pablo Perez",
            "title": "Especialista en Marketing Digital",
            "createdAt": "2020-10-20T02:23:06.299Z",
            "status": true,
            "entity_status": true,
            "courses": []
        }
    ]
}
}
 * @apiErrorExample {json} Error
 *    HTTP/1.1 400 Bad Request
 * {
    "error": "Bad Request"
  }
 */

/**
 * @api {get} /teacher/:id Obtener por id
 * @ApiDescription Obtener profesor por id
 * @apiGroup Profesores - Admin
 * @ApiParam {id} id teacher_id Unico del profesor a obtener
 * @apiExample {curl} Sample usage:
 * curl -X GET \
 * <API_URL>/teacher/15 \
 * -H 'Content-Type: application/json' \
 * -H 'cache-control: no-cache'
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 20O OK{
 * {
    "data": {
        "courses": [],
        "status": true,
        "entity_status": true,
        "_id": "5f8e4a0ad4fb1e44180ab2d2",
        "full_name": "Pablo Perez",
        "profile_photo": "",
        "title": "Especialista en Marketing Digital",
        "description": "Me especializo en Marketin Digital y otras cosas más",
        "socials": {
            "instagram": "instagram.com",
            "twitter": "twitter.com",
            "facebook": "facebook",
            "linkedin": "linkedin",
            "youtube": "youtube"
        },
        "createdAt": "2020-10-20T02:23:06.299Z",
        "updatedAt": "2020-10-20T02:23:06.299Z",
        "teacher_id": 15,
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
    entity_status: STATUS.PUBLISHED,
  };

  const options = {
    page: page || 1,
    limit: limit || 5,
    sort: { [field]: order },
    collation: {
      locale: "en",
    },
  };

  const populateOptions = {
    path: "courses",
    select: "name slug",
  };

  const paginate = await Teacher.paginate(query, options)
    .then(async (result) => result)
    .catch((err) => logger.info(err));

  const populate = await Course.populate(paginate.docs, populateOptions)
    .then(async (data) => data)
    .catch((err) => logger.info(err));

  const data = {
    data: populate.map((r) => teachers.allTeachers(r)),
    pagination: pagination.paginationLabels(paginate),
  };
  
  return data;
};

const getById = async (id) => {
  const populateOptions = {
    path: "courses",
    select: "name status",
  };

  const find = await Teacher.findOne({ teacher_id: id })
    .then(async (result) => result)
    .catch((err) => logger.info(err));

  const populate = await Course.populate(find, populateOptions)
    .then(async (data) => data)
    .catch((err) => logger.info(err));

  // No need to mask before outpout
  return populate;
};

module.exports = {
  getAll,
  getById,
};
