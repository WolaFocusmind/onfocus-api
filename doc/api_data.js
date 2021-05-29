define({ "api": [
  {
    "type": "get",
    "url": "/category",
    "title": "Obtener todo",
    "description": "<p>Retornas todas las categorías. Retorna un objeto paginado. Query params son opcionales</p>",
    "group": "Categorias_-_Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "QueryParam",
            "optional": false,
            "field": "page",
            "description": "<p>Pagina Pagina del query a obtener</p>"
          },
          {
            "group": "Parameter",
            "type": "QueryParam",
            "optional": false,
            "field": "limit",
            "description": "<p>Limite de categorías a obtener</p>"
          },
          {
            "group": "Parameter",
            "type": "QueryParam",
            "optional": false,
            "field": "field",
            "description": "<p>Campo por el cual se ordenará la lista</p>"
          },
          {
            "group": "Parameter",
            "type": "QueryParam",
            "optional": false,
            "field": "order",
            "description": "<p>Orden ascendente o descendente (-1 desc || 1 asc)</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Sample usage:",
        "content": "curl -X GET \\\n<API_URL>/category?page=1&limit=10&field=createdAt&order=1 \\\n-H 'Content-Type: application/json' \\\n-H 'cache-control: no-cache'",
        "type": "curl"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 20O OK\n{\n    \"data\": [\n        {\n            \"id_hash\": \"5f740739f7060312489ea40e\",\n            \"id\": 0,\n            \"name\": \"Marketing Digital\",\n            \"slug\": \"marketing-digital\",\n            \"createdAt\": \"2020-09-30T04:19:05.812Z\",\n            \"status\": true,\n            \"entity_status\": true,\n            \"courses\": [\n                {\n                    \"_id\": \"5f7424280820e50a6c93ec0a\",\n                    \"name\": \"Marketing Digital Inicial\",\n                    \"slug\": \"marketing-digital-inicial\"\n                }\n            ]\n        },\n        {\n            \"id_hash\": \"5f7407abf7060312489ea40f\",\n            \"id\": 1,\n            \"name\": \"Publicidad Online\",\n            \"slug\": \"publicidad-online\",\n            \"createdAt\": \"2020-09-30T04:20:59.957Z\",\n            \"status\": true,\n            \"entity_status\": true,\n            \"courses\": []\n        },\n        {\n            \"id_hash\": \"5f7407b3f7060312489ea410\",\n            \"id\": 2,\n            \"name\": \"prueba 4\",\n            \"slug\": \"social-media\",\n            \"createdAt\": \"2020-09-30T04:21:07.644Z\",\n            \"status\": true,\n            \"entity_status\": true,\n            \"courses\": [\n                {\n                    \"_id\": \"5f760e633e77a6345c6e834d\",\n                    \"name\": \"Social Paid Media\",\n                    \"slug\": \"social-paid-media\"\n                }\n            ]\n        },\n        {\n            \"id_hash\": \"5f7407bbf7060312489ea411\",\n            \"id\": 3,\n            \"name\": \"Diseño Gráfico\",\n            \"slug\": \"diseno-grafico\",\n            \"createdAt\": \"2020-09-30T04:21:15.085Z\",\n            \"status\": true,\n            \"entity_status\": true,\n            \"courses\": [\n                {\n                    \"_id\": \"5f74249a0820e50a6c93ec0c\",\n                    \"name\": \"Diseño de Logotipos\",\n                    \"slug\": \"diseno-de-logotipos\"\n                }\n            ]\n        },\n        {\n            \"id_hash\": \"5f740877f7060312489ea412\",\n            \"id\": 4,\n            \"name\": \"Coaching\",\n            \"slug\": \"coaching\",\n            \"createdAt\": \"2020-09-30T04:24:23.112Z\",\n            \"status\": true,\n            \"entity_status\": true,\n            \"courses\": [\n                {\n                    \"_id\": \"5f7424f60820e50a6c93ec0d\",\n                    \"name\": \"Como ser tu propio Jefe\",\n                    \"slug\": \"como-ser-tu-propio-jefe\"\n                }\n            ]\n        }\n    ],\n    \"pagination\": {\n        \"totalDocs\": 12,\n        \"limit\": 5,\n        \"page\": 1,\n        \"nextPage\": 2,\n        \"prevPage\": null,\n        \"totalPages\": 3,\n        \"hasPrevPage\": false,\n        \"hasNextPage\": true,\n        \"pagingCounter\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "   HTTP/1.1 400 Bad Request\n{\n    \"error\": \"Bad Request\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/services/category/get.js",
    "groupTitle": "Categorias_-_Admin",
    "name": "GetCategory"
  },
  {
    "type": "get",
    "url": "/category/:slug",
    "title": "Obtener por slug",
    "description": "<p>Obtener una categoría mediante su slug</p>",
    "group": "Categorias_-_Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "slug",
            "optional": false,
            "field": "slug",
            "description": "<p>Slug Unico de la categoría a obtener</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Sample usage:",
        "content": "curl -X GET \\\n<API_URL>/category/marketing-digital \\\n-H 'Content-Type: application/json' \\\n-H 'cache-control: no-cache'",
        "type": "curl"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 20O OK{\n{\n    \"data\": {\n        \"courses\": [\n            {\n                \"status\": true,\n                \"_id\": \"5f7424280820e50a6c93ec0a\",\n                \"name\": \"Marketing Digital Inicial\"\n            }\n        ],\n        \"status\": true,\n        \"entity_status\": true,\n        \"slug_history\": [\n            \"marketing-digital\"\n        ],\n        \"_id\": \"5f740739f7060312489ea40e\",\n        \"name\": \"Marketing Digital\",\n        \"createdAt\": \"2020-09-30T04:19:05.812Z\",\n        \"updatedAt\": \"2020-10-16T03:54:47.295Z\",\n        \"category_id\": 0,\n        \"__v\": 1,\n        \"slug\": \"marketing-digital\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Get error",
          "content": "   HTTP/1.1 400 Bad Request\n{\n    \"error\": \"Bad Request\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/services/category/get.js",
    "groupTitle": "Categorias_-_Admin",
    "name": "GetCategorySlug"
  },
  {
    "type": "post",
    "url": "/category",
    "title": "Crear",
    "description": "<p>Crear una categoría.</p>",
    "group": "Categorias_-_Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Nombre de la categoría (Obligatorio)</p>"
          },
          {
            "group": "Parameter",
            "type": "Array[]",
            "optional": false,
            "field": "courses",
            "description": "<p>Array con cursos pertenecientes a la categoria (Opcional)</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Input",
        "content": "{\n  \"name\": \"Nombre de la categría\",\n  \"courses\": [\"...ObjectId de los cursos a agregar dentro de la categoría\"]\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 201 Created{\n  \"CREATED\": {\n      \"code\": 201,\n      \"message\": \"Created Successfully!\"\n  },\n  \"data\": {\n      \"courses\": [],\n      \"status\": true,\n      \"entity_status\": true,\n      \"_id\": \"5f8cb31875d7123f4454c345\",\n      \"slug_history\": [\n          \"nombre-de-la-categria\"\n      ],\n      \"name\": \"Nombre de la categría\",\n      \"slug\": \"nombre-de-la-categria\",\n      \"createdAt\": \"2020-10-18T21:26:49.065Z\",\n      \"updatedAt\": \"2020-10-18T21:26:49.065Z\",\n     \"category_id\": 23,\n      \"__v\": 0\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "   HTTP/1.1 500 Internal Server Error\n{\n    \"error\": \"INVALID_NAME\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/services/category/create.js",
    "groupTitle": "Categorias_-_Admin",
    "name": "PostCategory"
  },
  {
    "type": "put",
    "url": "/category/courses/add",
    "title": "Añadir cursos",
    "description": "<p>Añadir cursos a una categoría</p>",
    "group": "Categorias_-_Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>Id de la categoría (Obligatorio)</p>"
          },
          {
            "group": "Parameter",
            "type": "Array[]",
            "optional": false,
            "field": "courses",
            "description": "<p>Array con los cursos que se añadiran a la categoria (Obligatorio)</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Input",
        "content": "{\n  \"id\": \"5f8cb31875d7123f4454c345\",\n  \"courses\": [\"5f7424190820e50a6c93ec08\", \"5f7424230820e50a6c93ec09\"]\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 20O OK{\n{\n    \"CREATED\": {\n        \"code\": 201,\n        \"message\": \"Created Successfully!\"\n    },\n    \"data\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "   HTTP/1.1 400 Bad Request\n{\n    \"error\": \"Bad Request\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/services/category/add.js",
    "groupTitle": "Categorias_-_Admin",
    "name": "PutCategoryCoursesAdd"
  },
  {
    "type": "put",
    "url": "/category/courses/delete",
    "title": "Borrar cursos",
    "description": "<p>Borrar cursos pertenecientes a una categoría.</p>",
    "group": "Categorias_-_Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "category",
            "description": "<p>ObjectId de la categoria</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "course",
            "description": "<p>Curso a eliminar de la categoria</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n    \"category\": \"5f8cb31875d7123f4454c345\",\n    \"course\": \"5f7424190820e50a6c93ec08\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK {\n  {\n    \"UPDATED\": {\n        \"code\": 200,\n        \"message\": \"Updated Successfully!\"\n    }\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "   HTTP/1.1 400 Bad Request\n{\n    \"error\": \"Bad Request\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/services/category/update.js",
    "groupTitle": "Categorias_-_Admin",
    "name": "PutCategoryCoursesDelete"
  },
  {
    "type": "put",
    "url": "/category/:id",
    "title": "Actualizar",
    "description": "<p>Actualizar una categoría ya creada. Incluyendo su estado y otros campos.</p>",
    "group": "Categorias_-_Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "category_id",
            "description": "<p>category_id autoincremental de la categoría a actualizar</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "Body",
            "description": "<p>Body con todos los campos a actualizar de la categoría</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Input",
        "content": "{\n    \"name\": \"Nombre de la categría\",\n    \"status\": false,\n   \"entity_status\": false\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK {\n  {\n    \"UPDATED\": {\n        \"code\": 200,\n        \"message\": \"Updated Successfully!\"\n    }\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "   HTTP/1.1 400 Bad Request\n{\n    \"error\": \"Bad Request\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/services/category/update.js",
    "groupTitle": "Categorias_-_Admin",
    "name": "PutCategoryId"
  },
  {
    "type": "put",
    "url": "/category/:id",
    "title": "Actualizar",
    "description": "<p>Actualizar una categoría ya creada. Incluyendo su estado y otros campos.</p>",
    "group": "Categorias_-_Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "category_id",
            "description": "<p>category_id autoincremental de la categoría a actualizar</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "Body",
            "description": "<p>Body con todos los campos a actualizar de la categoría</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Input",
        "content": "{\n    \"name\": \"Nombre de la categría\",\n    \"status\": false,\n   \"entity_status\": false\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK {\n  {\n    \"UPDATED\": {\n        \"code\": 200,\n        \"message\": \"Updated Successfully!\"\n    }\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "   HTTP/1.1 400 Bad Request\n{\n    \"error\": \"Bad Request\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/services/entities/update.js",
    "groupTitle": "Categorias_-_Admin",
    "name": "PutCategoryId"
  },
  {
    "type": "post",
    "url": "/course",
    "title": "Crear",
    "description": "<p>Crear un nuevo curso. Este endpoint recibe todo los objetos de modulos, precio, recomendaciones y otras entidades que componen un curso.</p>",
    "group": "Cursos_-_Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Nombre del Curso (Obligatorio)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Descripción del Curso (Opcional)</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Input",
        "content": "{\n  \"name\": \"Nombre del Curso\",\n  \"description\": \"Descripción del curso\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 201 Created{\n  {\n    \"CREATED\": {\n        \"code\": 201,\n        \"message\": \"Created Successfully!\"\n    },\n    \"data\": {\n        \"modules\": [],\n        \"price\": [],\n        \"testimonials\": [],\n        \"status\": true,\n        \"entity_status\": true,\n        \"total_students\": 0,\n        \"course_details_items\": [],\n        \"course_target_items\": [],\n        \"_id\": \"5f8d71eadebde50d00c2cd8b\",\n        \"slug_history\": [\n            \"nombre-de-la-categria\"\n        ],\n        \"name\": \"Nombre de la categría\",\n        \"description\": \"Descripción del curso\",\n        \"slug\": \"nombre-de-la-categria\",\n        \"createdAt\": \"2020-10-19T11:00:58.675Z\",\n        \"updatedAt\": \"2020-10-19T11:00:58.675Z\",\n        \"course_id\": 32,\n        \"__v\": 0\n    }\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "   HTTP/1.1 400 Bad request\n{\n    \"error\": \"INVALID_NAME\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/services/course/create.js",
    "groupTitle": "Cursos_-_Admin",
    "name": "PostCourse"
  },
  {
    "type": "put",
    "url": "/course/:id",
    "title": "Actualizar",
    "description": "<p>Actualizar un curso ya creado. Incluyendo su estado y otros campos.</p>",
    "group": "Cursos_-_Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "course_id",
            "description": "<p>course_id autoincremental del curso a actualizar</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "Body",
            "description": "<p>Body con todos los campos a actualizar del curso</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Input",
        "content": "   {\n    \"name\": \"Marketing Digital Super Experto\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK {\n    \"UPDATED\": {\n        \"code\": 200,\n        \"message\": \"Updated Successfully!\"\n    }\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "   HTTP/1.1 400 Bad Request\n{\n    \"error\": \"Bad Request\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/services/course/update.js",
    "groupTitle": "Cursos_-_Admin",
    "name": "PutCourseId"
  },
  {
    "type": "get",
    "url": "/course",
    "title": "Obtener todo",
    "description": "<p>Retorna todos los cursos. Retorna un objeto paginado. Query params son opcionales</p>",
    "group": "Cursos_-_Publico",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "QueryParam",
            "optional": false,
            "field": "page",
            "description": "<p>Pagina Pagina del query a obtener</p>"
          },
          {
            "group": "Parameter",
            "type": "QueryParam",
            "optional": false,
            "field": "limit",
            "description": "<p>Limite de categorías a obtener</p>"
          },
          {
            "group": "Parameter",
            "type": "QueryParam",
            "optional": false,
            "field": "field",
            "description": "<p>Campo por el cual se ordenará la lista</p>"
          },
          {
            "group": "Parameter",
            "type": "QueryParam",
            "optional": false,
            "field": "order",
            "description": "<p>Orden ascendente o descendente (-1 desc || 1 asc)</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Sample usage:",
        "content": "curl -X GET \\\n<API_URL>/course?page=1&limit=10&field=createdAt&order=1 \\\n-H 'Content-Type: application/json' \\\n-H 'cache-control: no-cache'",
        "type": "curl"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 20O OK\n{\n    \"data\": [\n        {\n            \"course_id\": 0,\n            \"course_id_hash\": \"5f7424190820e50a6c93ec08\",\n            \"teacher\": \"\",\n            \"price\": 100,\n            \"students\": 5,\n            \"category\": \"\",\n            \"name\": \"Facebook Ads\",\n            \"slug\": \"facebook-ads\",\n            \"description\": \"Curso sobre como viralizar anuncios en Facebook\",\n            \"createdAt\": \"2020-09-30T06:22:17.428Z\",\n            \"video_intro\": \"76979871\",\n            \"featured_image\": \"https://dummyimage.com/600x400/000/fff\",\n            \"status\": true,\n            \"module\": 10,\n            \"entity_status\": true,\n            \"duration\": 600,\n            \"discount\": 10\n        },\n        {\n            \"course_id\": 1,\n            \"course_id_hash\": \"5f7424230820e50a6c93ec09\",\n            \"teacher\": \"John Doe\",\n            \"price\": 100,\n            \"students\": 5,\n            \"category\": \"Nombre de la categría\",\n            \"name\": \"Marketing Digital Experto\",\n            \"slug\": \"marketing-digital-experto\",\n            \"description\": \"Curso para quienes quieren ser expertos en MKT Digital\",\n            \"createdAt\": \"2020-09-30T06:22:27.157Z\",\n            \"video_intro\": \"76979871\",\n            \"featured_image\": \"https://dummyimage.com/600x400/000/fff\",\n            \"status\": true,\n            \"module\": 10,\n            \"entity_status\": true,\n            \"duration\": 600,\n            \"discount\": 10\n        },\n        {\n            \"course_id\": 2,\n            \"course_id_hash\": \"5f7424280820e50a6c93ec0a\",\n            \"teacher\": \"\",\n            \"price\": 100,\n            \"students\": 5,\n            \"category\": \"\",\n            \"name\": \"Marketing Digital Inicial\",\n            \"slug\": \"marketing-digital-inicial\",\n            \"description\": \"Curso para quienes quieren ser iniciarse en MKT Digital\",\n            \"createdAt\": \"2020-09-30T06:22:32.938Z\",\n            \"video_intro\": \"76979871\",\n            \"featured_image\": \"https://dummyimage.com/600x400/000/fff\",\n            \"status\": true,\n            \"module\": 10,\n            \"entity_status\": true,\n            \"duration\": 600,\n            \"discount\": 10\n        },\n        {\n            \"course_id\": 3,\n            \"course_id_hash\": \"5f7424750820e50a6c93ec0b\",\n            \"teacher\": \"John Doe\",\n            \"price\": 100,\n            \"students\": 5,\n            \"category\": \"prueba 4\",\n            \"name\": \"Manejo de Redes Sociales\",\n            \"slug\": \"manejo-de-redes-sociales\",\n            \"description\": \"Aprende a manejar redes sociales como un maestro\",\n            \"createdAt\": \"2020-09-30T06:23:49.219Z\",\n            \"video_intro\": \"76979871\",\n            \"featured_image\": \"https://dummyimage.com/600x400/000/fff\",\n            \"status\": true,\n            \"module\": 10,\n            \"entity_status\": true,\n            \"duration\": 600,\n            \"discount\": 10\n        },\n        {\n            \"course_id\": 4,\n            \"course_id_hash\": \"5f74249a0820e50a6c93ec0c\",\n            \"teacher\": \"Pepper Pots\",\n            \"price\": 100,\n            \"students\": 5,\n            \"category\": \"Diseño Gráfico\",\n            \"name\": \"Diseño de Logotipos\",\n            \"slug\": \"diseno-de-logotipos\",\n            \"description\": \"Aprender el arte de los Logotipos\",\n            \"createdAt\": \"2020-09-30T06:24:26.275Z\",\n            \"video_intro\": \"76979871\",\n            \"featured_image\": \"https://dummyimage.com/600x400/000/fff\",\n            \"status\": true,\n            \"module\": 10,\n            \"entity_status\": true,\n            \"duration\": 600,\n            \"discount\": 10\n        }\n    ],\n    \"paginate\": {\n        \"totalDocs\": 29,\n        \"limit\": 5,\n        \"page\": 1,\n        \"nextPage\": 2,\n        \"prevPage\": null,\n        \"totalPages\": 6,\n        \"hasPrevPage\": false,\n        \"hasNextPage\": true,\n        \"pagingCounter\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "   HTTP/1.1 400 Bad Request\n{\n    \"error\": \"Bad Request\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/services/course/get.js",
    "groupTitle": "Cursos_-_Publico",
    "name": "GetCourse"
  },
  {
    "type": "get",
    "url": "/course/:slug",
    "title": "Obtener por slug",
    "description": "<p>Obtener un curso mediante su slug</p>",
    "group": "Cursos_-_Publico",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "slug",
            "optional": false,
            "field": "Slug",
            "description": "<p>Unico del curso a obtener</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Sample usage:",
        "content": "curl -X GET \\\n<API_URL>/curso/facebook-ads \\\n-H 'Content-Type: application/json' \\\n-H 'cache-control: no-cache'",
        "type": "curl"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 20O OK{\n{\n    \"data\": {\n        \"course_id\": 33,\n        \"course_id_hash\": \"5f95e1af9b06720a2814b8d2\",\n        \"title\": \"Como ser comunnity manager\",\n        \"slug\": \"como-ser-comunnity-manager\",\n        \"category\": \"Marketing Digital\",\n        \"featured_image\": \"https://focus-test2.s3.amazonaws.com/c8510d1a-de55-44b8-b791-3ece5650cd57.png\",\n        \"status\": true,\n        \"teacher\": {\n            \"_id\": \"5f95dd9215524e449423b471\",\n            \"profile_photo\": \"https://focus-test2.s3.amazonaws.com/662d42a9-634f-400e-b38c-55fc0408e9d4.png\",\n            \"full_name\": \"John Doe\",\n            \"title\": \"UX Designer\",\n            \"description\": \"Lorem ipsum dolor\",\n            \"socials\": {\n                \"instagram\": \"https://instagram.com/johndoe\",\n                \"twitter\": \"https://twitter.com/johndoe\",\n                \"facebook\": \"https://facebook/johndoe\",\n                \"linkedin\": \"https://www.linkedin.com/in/johndoe\",\n                \"youtube\": \"https://youtube.com/johndoe\"\n            }\n        },\n        \"total_students\": 0,\n        \"total_duration\": 868,\n        \"description\": \"En este curso aprenderás a ser comunnity manager desde cero y\n        dar voz a grandes marcas\",\n        \"creation_date\": \"2020-10-25T20:36:00.986Z\",\n        \"video_intro\": \"76979871\",\n        \"total_modules\": 3,\n        \"about_this_course\": \"Lorem ipsum dolor sit amet, consectetuer adipiscing elit,\n        sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.\n        Ut wisi enim ad minim veniam. Duis autem vel eum iriure dolor in hendrerit in vulpu\n        tate velit esse molestie consequat.\",\n        \"course_details_items\": [\n            \"Ebook con resumen de la clase.\",\n            \"Documento descargable lorem ipsum.\",\n            \"Certificado Oficial\"\n        ],\n        \"course_target_items\": [\n            \"Ut wisi enim ad minim veniam.\",\n            \"Lorem ipsum dolor\",\n            \"Ut wisi enim ad minim veniam onsectet uer adipiscing.\"\n        ],\n        \"price\": [\n            {\n                \"country\": \"ARG\",\n                \"real_price\": 3000,\n                \"final_price\": 1500,\n                \"offer_discount\": 50,\n                \"offer_ends\": \"0\",\n                \"payment_method\": \"Mercado Pago\"\n            },\n            {\n                \"country\": \"USA\",\n                \"real_price\": 20,\n                \"final_price\": 10,\n                \"offer_discount\": 50,\n                \"offer_ends\": \"0\",\n                \"payment_method\": \"Stripe\"\n            },\n            {\n                \"country\": \"SPA\",\n                \"real_price\": 20,\n                \"final_price\": 10,\n                \"offer_discount\": 50,\n                \"offer_ends\": \"0\",\n                \"payment_method\": \"Stripe\"\n            }\n        ],\n        \"testimonials\": [\n            {\n                \"name\": \"Mary Curie\",\n                \"testimonial_id\": 1,\n                \"testimonial\": \"Excelente curso. Practico y 100% sencillo de hacer\",\n                \"profile_picture\": \"https://focus-test2.s3.amazonaws.com/c8510d1a-de55-44b8-b791-3ece5650cd57.png\"\n            },\n            {\n                \"name\": \"Albert Einstein\",\n                \"testimonial_id\": 2,\n                \"testimonial\": \"Lorem ipsum dolor. Lorem ipsum dolor\",\n                \"profile_picture\": \"https://focus-test2.s3.amazonaws.com/c8510d1a-de55-44b8-b791-3ece5650cd57.png\"\n            },\n            {\n                \"name\": \"Jonas Doe\",\n                \"testimonial_id\": 3,\n                \"testimonial\": \"Lorem ipsum dolor. Lorem ipsum dolor\",\n                \"profile_picture\": \"https://focus-test2.s3.amazonaws.com/c8510d1a-de55-44b8-b791-3ece5650cd57.png\"\n            }\n        ],\n        \"modules\": [\n            {\n                \"name\": \"¿Como volverse viral?\",\n                \"module_id\": 0,\n                \"description\": \"como-volverse-viral\",\n                \"total_duration\": \"434\"\n            },\n            {\n                \"name\": \"¿Como ganar seguidores?\",\n                \"module_id\": 1,\n                \"description\": \"como-ganar-seguidores\",\n                \"total_duration\": \"217\"\n            },\n            {\n                \"name\": \"La importancia de unirse a influencers\",\n                \"module_id\": 2,\n                \"description\": \"la-importancia-de-unirse-a-influencers\",\n                \"total_duration\": \"217\"\n            }\n        ]\n    }\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "   HTTP/1.1 400 Bad Request\n{\n    \"error\": \"Bad Request\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/services/course/get.js",
    "groupTitle": "Cursos_-_Publico",
    "name": "GetCourseSlug"
  },
  {
    "type": "get",
    "url": "/me/course",
    "title": "Obtener todo comprado",
    "description": "<p>Retorna todos los cursos comprados por un usuario. Retorna un objeto paginado. Query params son opcionales</p>",
    "group": "Cursos_-_Publico",
    "header": {
      "fields": {
        "Token": [
          {
            "group": "Token",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token de la sesión del usuario (Obligatorio).</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "QueryParam",
            "optional": false,
            "field": "page",
            "description": "<p>Pagina Pagina del query a obtener</p>"
          },
          {
            "group": "Parameter",
            "type": "QueryParam",
            "optional": false,
            "field": "limit",
            "description": "<p>Limite de categorías a obtener</p>"
          },
          {
            "group": "Parameter",
            "type": "QueryParam",
            "optional": false,
            "field": "field",
            "description": "<p>Campo por el cual se ordenará la lista</p>"
          },
          {
            "group": "Parameter",
            "type": "QueryParam",
            "optional": false,
            "field": "order",
            "description": "<p>Orden ascendente o descendente (-1 desc || 1 asc)</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Sample usage:",
        "content": "curl -X GET \\\n<API_URL>/me/course?page=1&limit=10&field=createdAt&order=1 \\\n-H 'Content-Type: application/json' \\\n-H 'cache-control: no-cache'",
        "type": "curl"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 20O OK{\n    {\n    \"data\": [\n        {\n            \"course_id\": 0,\n            \"slug\": \"facebook-ads\",\n            \"course_id_hash\": \"5f7424190820e50a6c93ec08\",\n            \"teacher\": \"\",\n            \"category\": \"\",\n            \"featured_image\": \"https://dummyimage.com/600x400/000/fff\",\n            \"name\": \"Facebook Ads\",\n            \"progress\": 80\n        },\n        {\n            \"course_id\": 4,\n            \"slug\": \"diseno-de-logotipos\",\n            \"course_id_hash\": \"5f74249a0820e50a6c93ec0c\",\n            \"teacher\": \"Pepper Pots\",\n            \"category\": \"Diseño Gráfico\",\n            \"featured_image\": \"https://dummyimage.com/600x400/000/fff\",\n            \"name\": \"Diseño de Logotipos\",\n            \"progress\": 80\n        },\n        {\n            \"course_id\": 28,\n            \"slug\": \"analisis-y-costos\",\n            \"course_id_hash\": \"5f85ca882fa49446b8a589a2\",\n            \"teacher\": \"\",\n            \"category\": \"\",\n            \"featured_image\": \"https://placeimg.com/640/480/arch\",\n            \"name\": \"Analisis y Costos\",\n            \"progress\": 80\n        },\n        {\n            \"course_id\": 30,\n            \"slug\": \"3ds-max-studio-1\",\n            \"course_id_hash\": \"5f85cd3f6f86be1f74baf804\",\n            \"teacher\": \"\",\n            \"category\": \"\",\n            \"featured_image\": \"https://placeimg.com/640/480/arch\",\n            \"name\": \"3DS Max Studio\",\n            \"progress\": 80\n        },\n        {\n            \"course_id\": 29,\n            \"slug\": \"3ds-max-studio\",\n            \"course_id_hash\": \"5f85ccc36f86be1f74baf803\",\n            \"teacher\": \"\",\n            \"category\": \"\",\n            \"featured_image\": \"https://placeimg.com/640/480/arch\",\n            \"name\": \"3DS Max Studio\",\n            \"progress\": 80\n        }\n    ]\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "   HTTP/1.1 400 Bad Request\n{\n    \"error\": \"Bad Request\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/services/course/get.js",
    "groupTitle": "Cursos_-_Publico",
    "name": "GetMeCourse"
  },
  {
    "type": "get",
    "url": "/me/course/:slug",
    "title": "Obtener comprado por slug",
    "description": "<p>Obtener un curso comprado mediante su slug</p>",
    "group": "Cursos_-_Publico",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "slug",
            "optional": false,
            "field": "Slug",
            "description": "<p>Unico del curso a obtener</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Token": [
          {
            "group": "Token",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token de la sesión del usuario (Obligatorio).</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Sample usage:",
        "content": "curl -X GET \\\n<API_URL>/me/course/facebook-ads \\\n-H 'Content-Type: application/json' \\\n-H 'cache-control: no-cache'",
        "type": "curl"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 20O OK{\n{\n    \"data\": {\n        \"course_id\": 0,\n        \"course_id_hash\": \"5f7424190820e50a6c93ec08\",\n        \"title\": \"Facebook Ads\",\n        \"slug\": \"facebook-ads\",\n        \"category\": \"\",\n        \"featured_image\": \"https://dummyimage.com/600x400/000/fff\",\n        \"status\": true,\n        \"teacher\": \"\",\n        \"students\": 5,\n        \"duration\": 2400,\n        \"description\": \"Curso sobre como viralizar anuncios en Facebook\",\n        \"creation_date\": \"2020-09-30T06:22:17.428Z\",\n        \"video_intro\": \"76979871\",\n        \"module\": 10,\n        \"entity_status\": true,\n        \"about_this_course\": \"Esta es la información sobre este curso\",\n        \"course_details_items\": [\n            \"Ebook de apoyo\",\n            \"Certificado oficial\"\n        ],\n        \"course_target_items\": [\n            \"Tienes un alto grado de conocimiento del tema.\",\n            \"Sabes usar herramientas informaticas\"\n        ],\n        \"modules\": [\n            {\n                \"module_id\": 1,\n                \"name\": \"Module 1\",\n                \"text\": \"texto 1\",\n                \"videos\": [\n                    {\n                        \"video_id\": 2,\n                        \"name\": \"video2\",\n                        \"url\": \"54561111\",\n                        \"status\": true\n                    },\n                    {\n                        \"video_id\": 3,\n                        \"name\": \"video3\",\n                        \"url\": \"7772458\",\n                        \"status\": true\n                    },\n                    {\n                        \"video_id\": 4,\n                        \"name\": \"video4\",\n                        \"url\": \"5544234\",\n                        \"status\": true\n                    },\n                    {\n                        \"video_id\": 5,\n                        \"name\": \"video5\",\n                        \"url\": \"437219229\",\n                        \"status\": true\n                    }\n                ]\n            },\n            {\n                \"module_id\": 2,\n                \"text\": \"texto 2\",\n                \"name\": \"Module 2\"\n            },\n            {\n                \"module_id\": 3,\n                \"text\": \"texto 3\",\n                \"name\": \"Module 3\"\n            },\n            {\n                \"module_id\": 4,\n                \"text\": \"texto 4\",\n                \"name\": \"Module 4\"\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "   HTTP/1.1 400 Bad Request\n{\n    \"error\": \"Bad Request\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/services/course/get.js",
    "groupTitle": "Cursos_-_Publico",
    "name": "GetMeCourseSlug"
  },
  {
    "type": "post",
    "url": "/me/course/buy",
    "title": "Comprar",
    "description": "<p>Comprar un curso. Este endpoint servirá para comprar un curso. Por los momentos los params son opcionales.</p>",
    "group": "Cursos_-_Publico",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "courses",
            "description": "<p>Curso o cursos a comprar (Obligatorio)</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "payment",
            "description": "<p>Indica si el usuario pago o no el curso (Obligatorio)</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Input",
        "content": "   {\n    \"courses\": [\"5f7424190820e50a6c93ec08\"],\n    \"payment\": true\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 201 Created{\n  {\n    \"CREATED\": {\n        \"code\": 201,\n        \"message\": \"Created Successfully!\"\n    },\n    \"data\": {\n        \"n\": 1,\n        \"nModified\": 1,\n        \"opTime\": {\n            \"ts\": \"6885286252883476482\",\n            \"t\": 7\n        },\n        \"electionId\": \"7fffffff0000000000000007\",\n        \"ok\": 1,\n        \"$clusterTime\": {\n            \"clusterTime\": \"6885286252883476482\",\n            \"signature\": {\n                \"hash\": \"e9jaY9T23gvznpi9UOsnhVNP58I=\",\n                \"keyId\": \"6877718696601583619\"\n            }\n        },\n        \"operationTime\": \"6885286252883476482\"\n    }\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "   HTTP/1.1 400 Bad request\n{\n    \"error\": \"INVALID_NAME\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/services/course/buy.js",
    "groupTitle": "Cursos_-_Publico",
    "name": "PostMeCourseBuy"
  },
  {
    "type": "post",
    "url": "/contact",
    "title": "Contacto",
    "description": "<p>Enviar email de contacto</p>",
    "group": "Emails_-_Publico",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Nombre del remitente</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email del remitente</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Teléfono del remitente</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje del remitente</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Input",
        "content": "{\n    \"name\": \"John Doe\",\n    \"email\": \"johndoe@gmail.com\",\n     \"phone\": \"11445566666\",\n     \"message\": \"Lorem ipsum dolor azimut\"\n  }",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 201 Created{\n  {\n    \"CREATED\": {\n        \"code\": 201,\n        \"message\": \"Created Successfully!\"\n    },\n    \"data\": true\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "   HTTP/1.1 500 Internal Server Error\n{\n    \"error\": \"INVALID_NAME\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/services/emails/emailSender.js",
    "groupTitle": "Emails_-_Publico",
    "name": "PostContact"
  },
  {
    "type": "get",
    "url": "/student",
    "title": "Obtener todo",
    "description": "<p>Retornas todos los estudiantes. Retorna un objeto paginado. Query params son opcionales</p>",
    "group": "Estudiantes_-_Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "QueryParam",
            "optional": false,
            "field": "page",
            "description": "<p>Pagina Pagina del query a obtener</p>"
          },
          {
            "group": "Parameter",
            "type": "QueryParam",
            "optional": false,
            "field": "limit",
            "description": "<p>Limite de categorías a obtener</p>"
          },
          {
            "group": "Parameter",
            "type": "QueryParam",
            "optional": false,
            "field": "field",
            "description": "<p>Campo por el cual se ordenará la lista</p>"
          },
          {
            "group": "Parameter",
            "type": "QueryParam",
            "optional": false,
            "field": "order",
            "description": "<p>Orden ascendente o descendente (-1 desc || 1 asc)</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Sample usage:",
        "content": "curl -X GET \\\n<API_URL>/student?page=1&limit=10&field=createdAt&order=1 \\\n-H 'Content-Type: application/json' \\\n-H 'cache-control: no-cache'",
        "type": "curl"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 20O OK{\n {\n    \"data\": [\n        {\n            \"id_hash\": \"5f7b69a86b8fc900176a6375\",\n            \"id\": 11,\n            \"user_type\": 2,\n            \"createdAt\": \"2020-10-05T18:44:56.838Z\",\n            \"email\": \"prueba@prueba.com\",\n            \"purchased_courses\": []\n        },\n        {\n            \"id_hash\": \"5f7b69c76b8fc900176a6376\",\n            \"id\": 12,\n            \"user_type\": 2,\n            \"createdAt\": \"2020-10-05T18:45:28.077Z\",\n            \"email\": \"prueba@prueba.com\",\n            \"purchased_courses\": []\n        },\n        {\n            \"id_hash\": \"5f7b6c446b8fc900176a6378\",\n            \"id\": 13,\n            \"user_type\": 2,\n            \"createdAt\": \"2020-10-05T18:56:04.945Z\",\n            \"email\": \"pruebas@pruebas.com\",\n            \"purchased_courses\": []\n        },\n        {\n            \"id_hash\": \"5f7b6d3f6b8fc900176a637a\",\n            \"id\": 14,\n            \"user_type\": 2,\n            \"createdAt\": \"2020-10-05T19:00:16.074Z\",\n            \"email\": \"murdoc.jose.6@gmail.com\",\n            \"purchased_courses\": []\n        },\n        {\n            \"id_hash\": \"5f7b6d6c6b8fc900176a637b\",\n            \"id\": 15,\n            \"user_type\": 2,\n            \"createdAt\": \"2020-10-05T19:01:00.476Z\",\n            \"email\": \"murdoc.jose.7@gmail.com\",\n            \"purchased_courses\": []\n        }\n    ],\n    \"pagination\": {\n        \"totalDocs\": 18,\n        \"limit\": 5,\n        \"page\": 1,\n        \"nextPage\": 2,\n        \"prevPage\": null,\n        \"totalPages\": 4,\n        \"hasPrevPage\": false,\n        \"hasNextPage\": true,\n        \"pagingCounter\": 1\n    }\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "   HTTP/1.1 400 Bad Request\n{\n    \"error\": \"Bad Request\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/services/student/get.js",
    "groupTitle": "Estudiantes_-_Admin",
    "name": "GetStudent"
  },
  {
    "type": "get",
    "url": "/student/:id",
    "title": "Obtener por id",
    "description": "<p>Obtener una estudiante mediante su id</p>",
    "group": "Estudiantes_-_Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "Id",
            "description": "<p>student_id Unico del estudiante a obtener</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Sample usage:",
        "content": "curl -X GET \\\n<API_URL>/student/15\\\n-H 'Content-Type: application/json' \\\n-H 'cache-control: no-cache'",
        "type": "curl"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 20O OK{\n {\n    \"data\": {\n        \"purchased_courses\": [],\n        \"user_type\": 2,\n        \"_id\": \"5f7b6d6c6b8fc900176a637b\",\n        \"email\": \"murdoc.jose.7@gmail.com\",\n        \"password\": \"$2b$10$Zw0perNPf035UBGK74WwM.qJvMCwSXDUDXMFUoPwl3fJmWY9oMmHO\",\n        \"createdAt\": \"2020-10-05T19:01:00.476Z\",\n        \"updatedAt\": \"2020-10-05T19:01:00.476Z\",\n        \"student_id\": 15,\n        \"__v\": 0\n    }\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Get error",
          "content": "   HTTP/1.1 400 Bad Request\n{\n    \"error\": \"Bad Request\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/services/student/get.js",
    "groupTitle": "Estudiantes_-_Admin",
    "name": "GetStudentId"
  },
  {
    "type": "put",
    "url": "/student/:id",
    "title": "Actualizar",
    "description": "<p>Actualizar un estudiante ya creado.</p>",
    "group": "Estudiantes_-_Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "student_id",
            "description": "<p>student_id autoincremental del estudiante a actualizar</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "Body",
            "description": "<p>Body con todos los campos a actualizar del estudiante</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Input",
        "content": "{\n    \"name\": \"Juan Perez\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK {\n  {\n    \"UPDATED\": {\n        \"code\": 200,\n        \"message\": \"Updated Successfully!\"\n    }\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "   HTTP/1.1 400 Bad Request\n{\n    \"error\": \"Bad Request\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/services/student/update.js",
    "groupTitle": "Estudiantes_-_Admin",
    "name": "PutStudentId"
  },
  {
    "type": "post",
    "url": "/student",
    "title": "Crear",
    "description": "<p>Crear un estudiante. Este endpoint sirve para hacer sign up.</p>",
    "group": "Estudiantes_-_Publico",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Nombre completo del estudiante (Opcional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Nombre de Usuario del estuadiante (Opcional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Contraseña del estuadiante (Obligatorio)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country",
            "description": "<p>País del estuadiante (Opcional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email del estuadiante (Obligatorio)</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Input",
        "content": "   {\n    \"name\":\"John Doe\",\n    \"username\": \"johndoe\",\n    \"password\":\"12345\",\n    \"country\":\"Argentina\",\n    \"email\":\"johndoe@gmail.com\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 201 Created{\n {\n    \"CREATED\": {\n        \"code\": 201,\n        \"message\": \"Created Successfully!\"\n    },\n    \"data\": {\n        \"purchased_courses\": [],\n        \"user_type\": 2,\n        \"_id\": \"5f8e42285a980f0017718ca9\",\n        \"name\": \"John Doe\",\n        \"username\": \"johndoe\",\n        \"password\": \"12345\",\n        \"country\": \"Argentina\",\n        \"email\": \"johndoe@gmail.com\",\n        \"createdAt\": \"2020-10-20T01:49:28.699Z\",\n        \"updatedAt\": \"2020-10-20T01:49:28.699Z\",\n        \"student_id\": 31,\n        \"__v\": 0\n    }\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "   HTTP/1.1 400 Bad request\n{\n    \"error\": \"INVALID_NAME\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/services/student/create.js",
    "groupTitle": "Estudiantes_-_Publico",
    "name": "PostStudent"
  },
  {
    "type": "post",
    "url": "/me/password",
    "title": "Cambiar contraseña",
    "description": "<p>Cambiar contraseña estando conectado desde la sección del perfil del usuario</p>",
    "group": "Perfil_-_Publico",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "oldPassword",
            "description": "<p>Password actual del usuario (Obligatorio)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "newPassword",
            "description": "<p>Password nuevo del usuario (Obligatorio)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "newPasswordConfirm",
            "description": "<p>Confirmación Password nuevo del usuario (Obligatorio)</p>"
          },
          {
            "group": "Parameter",
            "type": "email",
            "optional": false,
            "field": "email",
            "description": "<p>Email del usuario. Esto viene del token (Obligatorio)</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Token": [
          {
            "group": "Token",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token de la sesión del usuario (Obligatorio).</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Input",
        "content": "   {\n    \"oldPassword\": \"1q2w3e4r\",\n    \"newPassword\": \"1q2w3e4r!!\",\n    \"newPasswordConfirm\": \"1q2w3e4r!!\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 201 Created{\n {\n    \"data\": {\n        \"code\": 210,\n        \"message\": \"Password updated\"\n    }\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "   HTTP/1.1 200 OK\n{\n    \"data\": {\n        \"code\": 410,\n        \"message\": \"Please check your password\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/services/auth/password.js",
    "groupTitle": "Perfil_-_Publico",
    "name": "PostMePassword"
  },
  {
    "type": "put",
    "url": "/teacher/:id",
    "title": "Actualizar",
    "description": "<p>Actualizar un profesor ya creado. Incluyendo su estado y otros campos.</p>",
    "group": "Profesor_-_Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "teacher_id",
            "description": "<p>teacher_id autoincremental del profesor a actualizar</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "Body",
            "description": "<p>Body con todos los campos a actualizar del profesor</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Input",
        "content": "{\n    \"name\": \"Pablo Perez Alvarez\",\n    \"status\": false,\n   \"entity_status\": false\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK {\n  {\n    \"UPDATED\": {\n        \"code\": 200,\n        \"message\": \"Updated Successfully!\"\n    }\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "   HTTP/1.1 400 Bad Request\n{\n    \"error\": \"Bad Request\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/services/teacher/update.js",
    "groupTitle": "Profesor_-_Admin",
    "name": "PutTeacherId"
  },
  {
    "type": "get",
    "url": "/teacher",
    "title": "Obtener todo",
    "description": "<p>Retornas todas los profesores. Retorna un objeto paginado. Query params son opcionales</p>",
    "group": "Profesores_-_Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "QueryParam",
            "optional": false,
            "field": "page",
            "description": "<p>Pagina Pagina del query a obtener</p>"
          },
          {
            "group": "Parameter",
            "type": "QueryParam",
            "optional": false,
            "field": "limit",
            "description": "<p>Limite de categorías a obtener</p>"
          },
          {
            "group": "Parameter",
            "type": "QueryParam",
            "optional": false,
            "field": "field",
            "description": "<p>Campo por el cual se ordenará la lista</p>"
          },
          {
            "group": "Parameter",
            "type": "QueryParam",
            "optional": false,
            "field": "order",
            "description": "<p>Orden ascendente o descendente (-1 desc || 1 asc)</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Sample usage:",
        "content": "curl -X GET \\\n<API_URL>/teacher?page=1&limit=10&field=createdAt&order=1 \\\n-H 'Content-Type: application/json' \\\n-H 'cache-control: no-cache'",
        "type": "curl"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 20O OK\n{\n   {\n    \"data\": [\n        {\n            \"id_hash\": \"5f75d9cb81a9980017f37414\",\n            \"id\": 0,\n            \"full_name\": \"John Doe\",\n            \"title\": \"Maestro\",\n            \"createdAt\": \"2020-10-01T13:29:47.618Z\",\n            \"status\": true,\n            \"entity_status\": true,\n            \"courses\": [\n                {\n                    \"_id\": \"5f7424190820e50a6c93ec08\",\n                    \"name\": \"Facebook Ads\",\n                    \"slug\": \"facebook-ads\"\n                },\n                {\n                    \"_id\": \"5f7424230820e50a6c93ec09\",\n                    \"name\": \"Marketing Digital Super Experto\",\n                    \"slug\": \"marketing-digital-experto\"\n                },\n                {\n                    \"_id\": \"5f7424f60820e50a6c93ec0d\",\n                    \"name\": \"Como ser tu propio Jefe\",\n                    \"slug\": \"como-ser-tu-propio-jefe\"\n                }\n            ]\n        },\n        {\n            \"id_hash\": \"5f75db1181a9980017f37417\",\n            \"id\": 1,\n            \"full_name\": \"Maria Doe\",\n            \"title\": \"Full Stack Developer\",\n            \"createdAt\": \"2020-10-01T13:35:13.080Z\",\n            \"status\": true,\n            \"entity_status\": true,\n            \"courses\": [\n                {\n                    \"_id\": \"5f75daa93e77a6345c6e8343\",\n                    \"name\": \"React desde Cero\",\n                    \"slug\": \"react-desde-cero\"\n                },\n                {\n                    \"_id\": \"5f74a2fb528c5145487efaba\",\n                    \"name\": \"Angular desde Cero\",\n                    \"slug\": \"angular-desde-cero\"\n                }\n            ]\n        },\n        {\n            \"id_hash\": \"5f75db5681a9980017f37418\",\n            \"id\": 2,\n            \"full_name\": \"Pepper Pots\",\n            \"title\": \"Analista\",\n            \"createdAt\": \"2020-10-01T13:36:22.661Z\",\n            \"status\": true,\n            \"entity_status\": true,\n            \"courses\": [\n                {\n                    \"_id\": \"5f74251d0820e50a6c93ec0e\",\n                    \"name\": \"SCRUM desde Cero\",\n                    \"slug\": \"scrum-desde-cero\"\n                }\n            ]\n        },\n        {\n            \"id_hash\": \"5f86e755aa33e800179ceab6\",\n            \"id\": 14,\n            \"full_name\": \"Marina S\",\n            \"title\": \"Diseñadora\",\n            \"createdAt\": \"2020-10-14T11:56:05.999Z\",\n            \"status\": true,\n            \"entity_status\": true,\n            \"courses\": []\n        },\n        {\n            \"id_hash\": \"5f8e4a0ad4fb1e44180ab2d2\",\n            \"id\": 15,\n            \"full_name\": \"Pablo Perez\",\n            \"title\": \"Especialista en Marketing Digital\",\n            \"createdAt\": \"2020-10-20T02:23:06.299Z\",\n            \"status\": true,\n            \"entity_status\": true,\n            \"courses\": []\n        }\n    ]\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "   HTTP/1.1 400 Bad Request\n{\n    \"error\": \"Bad Request\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/services/teacher/get.js",
    "groupTitle": "Profesores_-_Admin",
    "name": "GetTeacher"
  },
  {
    "type": "get",
    "url": "/teacher/:id",
    "title": "Obtener por id",
    "description": "<p>Obtener profesor por id</p>",
    "group": "Profesores_-_Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>teacher_id Unico del profesor a obtener</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Sample usage:",
        "content": "curl -X GET \\\n<API_URL>/teacher/15 \\\n-H 'Content-Type: application/json' \\\n-H 'cache-control: no-cache'",
        "type": "curl"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 20O OK{\n{\n    \"data\": {\n        \"courses\": [],\n        \"status\": true,\n        \"entity_status\": true,\n        \"_id\": \"5f8e4a0ad4fb1e44180ab2d2\",\n        \"full_name\": \"Pablo Perez\",\n        \"profile_photo\": \"\",\n        \"title\": \"Especialista en Marketing Digital\",\n        \"description\": \"Me especializo en Marketin Digital y otras cosas más\",\n        \"socials\": {\n            \"instagram\": \"instagram.com\",\n            \"twitter\": \"twitter.com\",\n            \"facebook\": \"facebook\",\n            \"linkedin\": \"linkedin\",\n            \"youtube\": \"youtube\"\n        },\n        \"createdAt\": \"2020-10-20T02:23:06.299Z\",\n        \"updatedAt\": \"2020-10-20T02:23:06.299Z\",\n        \"teacher_id\": 15,\n        \"__v\": 0\n    }\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Get error",
          "content": "   HTTP/1.1 400 Bad Request\n{\n    \"error\": \"Bad Request\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/services/teacher/get.js",
    "groupTitle": "Profesores_-_Admin",
    "name": "GetTeacherId"
  },
  {
    "type": "post",
    "url": "/teacher",
    "title": "Crear",
    "description": "<p>Crear una profesor.</p>",
    "group": "Profesores_-_Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "full_name",
            "description": "<p>Nombre del profesor (Obligatorio)</p>"
          },
          {
            "group": "Parameter",
            "type": "base64",
            "optional": false,
            "field": "profile_photo",
            "description": "<p>Foto de perfil del profesor en base64 (Opcional)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>Titulo del profesor (Opcional)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": "<p>Descripción del profesor (Opcional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "socials",
            "description": "<p>Redes sociales del profesor (Opcional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Array[]",
            "optional": false,
            "field": "courses",
            "description": "<p>Array con cursos pertenecientes al profesor (Opcional)</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Input",
        "content": "   {\n    \"full_name\": \"Pablo Perez\",\n    \"profile_photo\": \"\",\n    \"title\": \"Especialista en Marketing Digital\",\n    \"description\":\"Me especializo en Marketin Digital y otras cosas más\",\n    \"socials\": {\n            \"instagram\" : \"instagram.com\",\n            \"twitter\" : \"twitter.com\",\n            \"facebook\" : \"facebook\",\n            \"linkedin\" : \"linkedin\",\n            \"youtube\" : \"youtube\"\n        },\n    \"courses\": []\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 201 Created{\n {\n    \"CREATED\": {\n        \"code\": 201,\n        \"message\": \"Created Successfully!\"\n    },\n    \"data\": {\n        \"courses\": [],\n        \"status\": true,\n        \"entity_status\": true,\n        \"_id\": \"5f8e4a0ad4fb1e44180ab2d2\",\n        \"full_name\": \"Pablo Perez\",\n        \"profile_photo\": \"\",\n        \"title\": \"Especialista en Marketing Digital\",\n        \"description\": \"Me especializo en Marketin Digital y otras cosas más\",\n        \"socials\": {\n            \"instagram\": \"instagram.com\",\n            \"twitter\": \"twitter.com\",\n            \"facebook\": \"facebook\",\n            \"linkedin\": \"linkedin\",\n            \"youtube\": \"youtube\"\n        },\n        \"createdAt\": \"2020-10-20T02:23:06.299Z\",\n        \"updatedAt\": \"2020-10-20T02:23:06.299Z\",\n        \"teacher_id\": 15,\n        \"__v\": 0\n    }\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "   HTTP/1.1 500 Internal Server Error\n{\n    \"error\": \"INVALID_NAME\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/services/teacher/create.js",
    "groupTitle": "Profesores_-_Admin",
    "name": "PostTeacher"
  },
  {
    "type": "put",
    "url": "/category/courses/add",
    "title": "Añadir cursos",
    "description": "<p>Añadir cursos a un profesor</p>",
    "group": "Profesores_-_Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>Id del profesor (Obligatorio)</p>"
          },
          {
            "group": "Parameter",
            "type": "Array[]",
            "optional": false,
            "field": "courses",
            "description": "<p>Array con los cursos que se añadiran al profesor (Obligatorio)</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Input",
        "content": "{\n  \"id\": \"5f8e4a0ad4fb1e44180ab2d2\",\n  \"courses\": [\"5f7424190820e50a6c93ec08\", \"5f7424230820e50a6c93ec09\"]\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 20O OK{\n{\n    \"CREATED\": {\n        \"code\": 201,\n        \"message\": \"Created Successfully!\"\n    },\n    \"data\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "   HTTP/1.1 400 Bad Request\n{\n    \"error\": \"Bad Request\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/services/teacher/add.js",
    "groupTitle": "Profesores_-_Admin",
    "name": "PutCategoryCoursesAdd"
  },
  {
    "type": "put",
    "url": "/teacher/courses/delete",
    "title": "Borrar cursos",
    "description": "<p>Borrar cursos pertenecientes a un profesor.</p>",
    "group": "Profesores_-_Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "teacher",
            "description": "<p>ObjectId del profesor</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "course",
            "description": "<p>Curso a eliminar del profesor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n    \"teacher\": \"5f8e4a0ad4fb1e44180ab2d2\",\n    \"course\": \"5f7424190820e50a6c93ec08\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK {\n  {\n    \"UPDATED\": {\n        \"code\": 200,\n        \"message\": \"Updated Successfully!\"\n    }\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "   HTTP/1.1 400 Bad Request\n{\n    \"error\": \"Bad Request\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/services/teacher/update.js",
    "groupTitle": "Profesores_-_Admin",
    "name": "PutTeacherCoursesDelete"
  },
  {
    "type": "get",
    "url": "/logout",
    "title": "Cerrar sesión",
    "description": "<p>Finaliza la session del usuario al usuario y le retorna un token de sesión</p>",
    "group": "Sesión_-_Publico",
    "header": {
      "fields": {
        "Token": [
          {
            "group": "Token",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token de la sesión del usuario (Obligatorio).</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Sample usage:",
        "content": "curl -X GET \\\n<API_URL>/login \\\n-H 'Content-Type: application/json' \\\n-H 'cache-control: no-cache'",
        "type": "curl"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 201 Created{\n  {\n    \"LOGOUT\": {\n        \"code\": 206,\n        \"message\": \"Logout Successfully!\"\n    },\n    \"data\": {\n        \"n\": 1,\n        \"nModified\": 1,\n        \"opTime\": {\n            \"ts\": \"6885277190502481921\",\n            \"t\": 7\n        },\n        \"electionId\": \"7fffffff0000000000000007\",\n        \"ok\": 1,\n        \"$clusterTime\": {\n            \"clusterTime\": \"6885277190502481921\",\n            \"signature\": {\n                \"hash\": \"FIe2P/YcYfwPQMImci7r+TMBIhs=\",\n                \"keyId\": \"6877718696601583619\"\n            }\n        },\n        \"operationTime\": \"6885277190502481921\"\n    }\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "   HTTP/1.1 400 Bad Request\n{\n    \"error\": \"INVALID_TOKEN\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/services/auth/logout.js",
    "groupTitle": "Sesión_-_Publico",
    "name": "GetLogout"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "Iniciar sesión",
    "description": "<p>Autentica al usuario y le retorna un token de sesión</p>",
    "group": "Sesión_-_Publico",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username de usuario (Opcional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Contraseña de usuario (Obligatorio)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email de usuario (Opcional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ipAddress",
            "description": "<p>Dirección IP de donde se conecta el usuario (Opcional)</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Input",
        "content": "   {\n    \"username\": \"admin\",\n    \"password\": \"contrasena\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 201 Created{\n  {\n    \"LOGIN\": {\n        \"code\": 205,\n        \"message\": \"Login Successfully!\"\n    },\n    \"data\": {\n        \"session\": {\n            \"status\": true,\n            \"_id\": \"5f8d69a7f2fe010e049444f4\",\n            \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\"\n        },\n        \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\"\n    }\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "   HTTP/1.1 400 Bad Request\n{\n    \"error\": \"INVALID_EMAIL\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/services/auth/login.js",
    "groupTitle": "Sesión_-_Publico",
    "name": "PostLogin"
  },
  {
    "type": "get",
    "url": "/all/:entity",
    "title": "Obtiene todo",
    "description": "<p>Obtiene todos los registros de una entidad sin paginación, con solo su nombre e id.</p>",
    "group": "Todo_-_Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Param",
            "optional": false,
            "field": "entity",
            "description": "<p>Entidad que se desea obtener</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Sample usage:",
        "content": "curl -X GET \\\n<API_URL>/all/0 \\\n-H 'Content-Type: application/json' \\\n-H 'cache-control: no-cache'",
        "type": "curl"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 20O OK\n{\n{\n    \"data\": [\n        {\n            \"_id\": \"5f7424190820e50a6c93ec08\",\n            \"name\": \"Facebook Ads\",\n            \"course_id\": 0\n        },\n        {\n            \"_id\": \"5f7424230820e50a6c93ec09\",\n            \"name\": \"Marketing Digital Super Experto\",\n            \"course_id\": 1\n        },\n        {\n            \"_id\": \"5f7424280820e50a6c93ec0a\",\n            \"name\": \"Marketing Digital Inicial\",\n            \"course_id\": 2\n        }\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "   HTTP/1.1 400 Bad Request\n{\n    \"error\": \"Bad Request\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/services/entities/get.js",
    "groupTitle": "Todo_-_Admin",
    "name": "GetAllEntity"
  }
] });
