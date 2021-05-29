"use sctrict";

const { Category, Course } = require("../../models");
const { logger, constants: { STATUS } } = require("../../tools");
const { pagination, categories } = require("../../middlewares/masks");

/**
 * @api {get} /category Obtener todo
 * @apiDescription Retornas todas las categorías.
 * Retorna un objeto paginado. Query params son opcionales
 * @apiGroup Categorias - Admin
 * @ApiParam {QueryParam} page Pagina Pagina del query a obtener
 * @ApiParam {QueryParam} limit Limite de categorías a obtener
 * @ApiParam {QueryParam} field Campo por el cual se ordenará la lista
 * @ApiParam {QueryParam} order Orden ascendente o descendente (-1 desc || 1 asc)
 * @apiExample {curl} Sample usage:
 * curl -X GET \
 * <API_URL>/category?page=1&limit=10&field=createdAt&order=1 \
 * -H 'Content-Type: application/json' \
 * -H 'cache-control: no-cache'
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 20O OK
 * {
    "data": [
        {
            "id_hash": "5f740739f7060312489ea40e",
            "id": 0,
            "name": "Marketing Digital",
            "slug": "marketing-digital",
            "createdAt": "2020-09-30T04:19:05.812Z",
            "status": true,
            "entity_status": true,
            "courses": [
                {
                    "_id": "5f7424280820e50a6c93ec0a",
                    "name": "Marketing Digital Inicial",
                    "slug": "marketing-digital-inicial"
                }
            ]
        },
        {
            "id_hash": "5f7407abf7060312489ea40f",
            "id": 1,
            "name": "Publicidad Online",
            "slug": "publicidad-online",
            "createdAt": "2020-09-30T04:20:59.957Z",
            "status": true,
            "entity_status": true,
            "courses": []
        },
        {
            "id_hash": "5f7407b3f7060312489ea410",
            "id": 2,
            "name": "prueba 4",
            "slug": "social-media",
            "createdAt": "2020-09-30T04:21:07.644Z",
            "status": true,
            "entity_status": true,
            "courses": [
                {
                    "_id": "5f760e633e77a6345c6e834d",
                    "name": "Social Paid Media",
                    "slug": "social-paid-media"
                }
            ]
        },
        {
            "id_hash": "5f7407bbf7060312489ea411",
            "id": 3,
            "name": "Diseño Gráfico",
            "slug": "diseno-grafico",
            "createdAt": "2020-09-30T04:21:15.085Z",
            "status": true,
            "entity_status": true,
            "courses": [
                {
                    "_id": "5f74249a0820e50a6c93ec0c",
                    "name": "Diseño de Logotipos",
                    "slug": "diseno-de-logotipos"
                }
            ]
        },
        {
            "id_hash": "5f740877f7060312489ea412",
            "id": 4,
            "name": "Coaching",
            "slug": "coaching",
            "createdAt": "2020-09-30T04:24:23.112Z",
            "status": true,
            "entity_status": true,
            "courses": [
                {
                    "_id": "5f7424f60820e50a6c93ec0d",
                    "name": "Como ser tu propio Jefe",
                    "slug": "como-ser-tu-propio-jefe"
                }
            ]
        }
    ],
    "pagination": {
        "totalDocs": 12,
        "limit": 5,
        "page": 1,
        "nextPage": 2,
        "prevPage": null,
        "totalPages": 3,
        "hasPrevPage": false,
        "hasNextPage": true,
        "pagingCounter": 1
    }
}
 * @apiErrorExample {json} Error
 *    HTTP/1.1 400 Bad Request
 * {
    "error": "Bad Request"
  }
 */

/**
 * @api {get} /category/:slug Obtener por slug
 * @ApiDescription Obtener una categoría mediante su slug
 * @apiGroup Categorias - Admin
 * @ApiParam {slug} slug Slug Unico de la categoría a obtener
 * @apiExample {curl} Sample usage:
 * curl -X GET \
 * <API_URL>/category/marketing-digital \
 * -H 'Content-Type: application/json' \
 * -H 'cache-control: no-cache'
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 20O OK{
 * {
    "data": {
        "courses": [
            {
                "status": true,
                "_id": "5f7424280820e50a6c93ec0a",
                "name": "Marketing Digital Inicial"
            }
        ],
        "status": true,
        "entity_status": true,
        "slug_history": [
            "marketing-digital"
        ],
        "_id": "5f740739f7060312489ea40e",
        "name": "Marketing Digital",
        "createdAt": "2020-09-30T04:19:05.812Z",
        "updatedAt": "2020-10-16T03:54:47.295Z",
        "category_id": 0,
        "__v": 1,
        "slug": "marketing-digital"
    }
}
 * @apiErrorExample {json} Get error
 *    HTTP/1.1 400 Bad Request
 * {
    "error": "Bad Request"
  }
 */

const getAll = async (page, limit, field = "createdAt", order = 1, queryField, queryValue) => {
  const query = {
    entity_status: STATUS.PUBLISHED,
    [queryField]: queryValue,
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

  const paginate = await Category.paginate(query, options)
    .then(async (result) => result)
    .catch((err) => logger.info(err));

  const populate = await Course.populate(paginate.docs, populateOptions)
    .then(async (data) => data)
    .catch((err) => logger.info(err));

  const data = {
    data: populate.map((r) => categories.allCategories(r)),
    pagination: pagination.paginationLabels(paginate),
  };
  
  return data;
};

const getBySlug = async (slug) => {
  const populateOptions = {
    path: "courses",
    select: "name status",
  };

  const find = await Category.findOne({ slug })
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
  getBySlug,
};
