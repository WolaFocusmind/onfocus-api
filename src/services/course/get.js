/* eslint-disable security/detect-object-injection */

"use sctrict";

/* eslint-disable no-underscore-dangle */

const {
  Course, Teacher, Category, Module,
  Lesson, Testimonial, Price, Progress, Purchase, Total,
} = require("../../models");

const { courses, pagination } = require("../../middlewares/masks");
const { constants: { STATUS, ENTITY_TYPES, PAYMENT_STATUS }, logger } = require("../../tools");

/**
 * @api {get} /course Obtener todo
 * @apiDescription Retorna todos los cursos.
 * Retorna un objeto paginado. Query params son opcionales
 * @apiGroup Cursos - Publico
 * @ApiParam {QueryParam} page Pagina Pagina del query a obtener
 * @ApiParam {QueryParam} limit Limite de categorías a obtener
 * @ApiParam {QueryParam} field Campo por el cual se ordenará la lista
 * @ApiParam {QueryParam} order Orden ascendente o descendente (-1 desc || 1 asc)
 * @apiExample {curl} Sample usage:
 * curl -X GET \
 * <API_URL>/course?page=1&limit=10&field=createdAt&order=1 \
 * -H 'Content-Type: application/json' \
 * -H 'cache-control: no-cache'
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 20O OK
 * {
    "data": [
        {
            "course_id": 0,
            "course_id_hash": "5f7424190820e50a6c93ec08",
            "teacher": "",
            "price": 100,
            "students": 5,
            "category": "",
            "name": "Facebook Ads",
            "slug": "facebook-ads",
            "description": "Curso sobre como viralizar anuncios en Facebook",
            "createdAt": "2020-09-30T06:22:17.428Z",
            "video_intro": "76979871",
            "featured_image": "https://dummyimage.com/600x400/000/fff",
            "status": true,
            "module": 10,
            "entity_status": true,
            "duration": 600,
            "discount": 10
        },
        {
            "course_id": 1,
            "course_id_hash": "5f7424230820e50a6c93ec09",
            "teacher": "John Doe",
            "price": 100,
            "students": 5,
            "category": "Nombre de la categría",
            "name": "Marketing Digital Experto",
            "slug": "marketing-digital-experto",
            "description": "Curso para quienes quieren ser expertos en MKT Digital",
            "createdAt": "2020-09-30T06:22:27.157Z",
            "video_intro": "76979871",
            "featured_image": "https://dummyimage.com/600x400/000/fff",
            "status": true,
            "module": 10,
            "entity_status": true,
            "duration": 600,
            "discount": 10
        },
        {
            "course_id": 2,
            "course_id_hash": "5f7424280820e50a6c93ec0a",
            "teacher": "",
            "price": 100,
            "students": 5,
            "category": "",
            "name": "Marketing Digital Inicial",
            "slug": "marketing-digital-inicial",
            "description": "Curso para quienes quieren ser iniciarse en MKT Digital",
            "createdAt": "2020-09-30T06:22:32.938Z",
            "video_intro": "76979871",
            "featured_image": "https://dummyimage.com/600x400/000/fff",
            "status": true,
            "module": 10,
            "entity_status": true,
            "duration": 600,
            "discount": 10
        },
        {
            "course_id": 3,
            "course_id_hash": "5f7424750820e50a6c93ec0b",
            "teacher": "John Doe",
            "price": 100,
            "students": 5,
            "category": "prueba 4",
            "name": "Manejo de Redes Sociales",
            "slug": "manejo-de-redes-sociales",
            "description": "Aprende a manejar redes sociales como un maestro",
            "createdAt": "2020-09-30T06:23:49.219Z",
            "video_intro": "76979871",
            "featured_image": "https://dummyimage.com/600x400/000/fff",
            "status": true,
            "module": 10,
            "entity_status": true,
            "duration": 600,
            "discount": 10
        },
        {
            "course_id": 4,
            "course_id_hash": "5f74249a0820e50a6c93ec0c",
            "teacher": "Pepper Pots",
            "price": 100,
            "students": 5,
            "category": "Diseño Gráfico",
            "name": "Diseño de Logotipos",
            "slug": "diseno-de-logotipos",
            "description": "Aprender el arte de los Logotipos",
            "createdAt": "2020-09-30T06:24:26.275Z",
            "video_intro": "76979871",
            "featured_image": "https://dummyimage.com/600x400/000/fff",
            "status": true,
            "module": 10,
            "entity_status": true,
            "duration": 600,
            "discount": 10
        }
    ],
    "paginate": {
        "totalDocs": 29,
        "limit": 5,
        "page": 1,
        "nextPage": 2,
        "prevPage": null,
        "totalPages": 6,
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
 * @api {get} /course/:slug Obtener por slug
 * @ApiDescription Obtener un curso mediante su slug
 * @apiGroup Cursos - Publico
 * @ApiParam {slug} Slug Unico del curso a obtener
 * @apiExample {curl} Sample usage:
 * curl -X GET \
 * <API_URL>/curso/facebook-ads \
 * -H 'Content-Type: application/json' \
 * -H 'cache-control: no-cache'
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 20O OK{
 * {
    "data": {
        "course_id": 33,
        "course_id_hash": "5f95e1af9b06720a2814b8d2",
        "title": "Como ser comunnity manager",
        "slug": "como-ser-comunnity-manager",
        "category": "Marketing Digital",
        "featured_image": "https://focus-test2.s3.amazonaws.com/c8510d1a-de55-44b8-b791-3ece5650cd57.png",
        "status": true,
        "teacher": {
            "_id": "5f95dd9215524e449423b471",
            "profile_photo": "https://focus-test2.s3.amazonaws.com/662d42a9-634f-400e-b38c-55fc0408e9d4.png",
            "full_name": "John Doe",
            "title": "UX Designer",
            "description": "Lorem ipsum dolor",
            "socials": {
                "instagram": "https://instagram.com/johndoe",
                "twitter": "https://twitter.com/johndoe",
                "facebook": "https://facebook/johndoe",
                "linkedin": "https://www.linkedin.com/in/johndoe",
                "youtube": "https://youtube.com/johndoe"
            }
        },
        "total_students": 0,
        "total_duration": 868,
        "description": "En este curso aprenderás a ser comunnity manager desde cero y
        dar voz a grandes marcas",
        "creation_date": "2020-10-25T20:36:00.986Z",
        "video_intro": "76979871",
        "total_modules": 3,
        "about_this_course": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
        sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
        Ut wisi enim ad minim veniam. Duis autem vel eum iriure dolor in hendrerit in vulpu
        tate velit esse molestie consequat.",
        "course_details_items": [
            "Ebook con resumen de la clase.",
            "Documento descargable lorem ipsum.",
            "Certificado Oficial"
        ],
        "course_target_items": [
            "Ut wisi enim ad minim veniam.",
            "Lorem ipsum dolor",
            "Ut wisi enim ad minim veniam onsectet uer adipiscing."
        ],
        "price": [
            {
                "country": "ARG",
                "real_price": 3000,
                "final_price": 1500,
                "offer_discount": 50,
                "offer_ends": "0",
                "payment_method": "Mercado Pago"
            },
            {
                "country": "USA",
                "real_price": 20,
                "final_price": 10,
                "offer_discount": 50,
                "offer_ends": "0",
                "payment_method": "Stripe"
            },
            {
                "country": "SPA",
                "real_price": 20,
                "final_price": 10,
                "offer_discount": 50,
                "offer_ends": "0",
                "payment_method": "Stripe"
            }
        ],
        "testimonials": [
            {
                "name": "Mary Curie",
                "testimonial_id": 1,
                "testimonial": "Excelente curso. Practico y 100% sencillo de hacer",
                "profile_picture": "https://focus-test2.s3.amazonaws.com/c8510d1a-de55-44b8-b791-3ece5650cd57.png"
            },
            {
                "name": "Albert Einstein",
                "testimonial_id": 2,
                "testimonial": "Lorem ipsum dolor. Lorem ipsum dolor",
                "profile_picture": "https://focus-test2.s3.amazonaws.com/c8510d1a-de55-44b8-b791-3ece5650cd57.png"
            },
            {
                "name": "Jonas Doe",
                "testimonial_id": 3,
                "testimonial": "Lorem ipsum dolor. Lorem ipsum dolor",
                "profile_picture": "https://focus-test2.s3.amazonaws.com/c8510d1a-de55-44b8-b791-3ece5650cd57.png"
            }
        ],
        "modules": [
            {
                "name": "¿Como volverse viral?",
                "module_id": 0,
                "description": "como-volverse-viral",
                "total_duration": "434"
            },
            {
                "name": "¿Como ganar seguidores?",
                "module_id": 1,
                "description": "como-ganar-seguidores",
                "total_duration": "217"
            },
            {
                "name": "La importancia de unirse a influencers",
                "module_id": 2,
                "description": "la-importancia-de-unirse-a-influencers",
                "total_duration": "217"
            }
        ]
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
 * @api {get} /me/course/:slug Obtener comprado por slug
 * @ApiDescription Obtener un curso comprado mediante su slug
 * @apiGroup Cursos - Publico
 * @ApiParam {slug} Slug Unico del curso a obtener
 * @apiHeader (Token) {String} token Token de la sesión del usuario (Obligatorio).
 * @apiExample {curl} Sample usage:
 * curl -X GET \
 * <API_URL>/me/course/facebook-ads \
 * -H 'Content-Type: application/json' \
 * -H 'cache-control: no-cache'
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 20O OK{
 * {
    "data": {
        "course_id": 0,
        "course_id_hash": "5f7424190820e50a6c93ec08",
        "title": "Facebook Ads",
        "slug": "facebook-ads",
        "category": "",
        "featured_image": "https://dummyimage.com/600x400/000/fff",
        "status": true,
        "teacher": "",
        "students": 5,
        "duration": 2400,
        "description": "Curso sobre como viralizar anuncios en Facebook",
        "creation_date": "2020-09-30T06:22:17.428Z",
        "video_intro": "76979871",
        "module": 10,
        "entity_status": true,
        "about_this_course": "Esta es la información sobre este curso",
        "course_details_items": [
            "Ebook de apoyo",
            "Certificado oficial"
        ],
        "course_target_items": [
            "Tienes un alto grado de conocimiento del tema.",
            "Sabes usar herramientas informaticas"
        ],
        "modules": [
            {
                "module_id": 1,
                "name": "Module 1",
                "text": "texto 1",
                "videos": [
                    {
                        "video_id": 2,
                        "name": "video2",
                        "url": "54561111",
                        "status": true
                    },
                    {
                        "video_id": 3,
                        "name": "video3",
                        "url": "7772458",
                        "status": true
                    },
                    {
                        "video_id": 4,
                        "name": "video4",
                        "url": "5544234",
                        "status": true
                    },
                    {
                        "video_id": 5,
                        "name": "video5",
                        "url": "437219229",
                        "status": true
                    }
                ]
            },
            {
                "module_id": 2,
                "text": "texto 2",
                "name": "Module 2"
            },
            {
                "module_id": 3,
                "text": "texto 3",
                "name": "Module 3"
            },
            {
                "module_id": 4,
                "text": "texto 4",
                "name": "Module 4"
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
 * @api {get} /me/course Obtener todo comprado
 * @apiDescription Retorna todos los cursos comprados por un usuario.
 * Retorna un objeto paginado. Query params son opcionales
 * @apiGroup Cursos - Publico
 * @apiHeader (Token) {String} token Token de la sesión del usuario (Obligatorio).
 * @ApiParam {QueryParam} page Pagina Pagina del query a obtener
 * @ApiParam {QueryParam} limit Limite de categorías a obtener
 * @ApiParam {QueryParam} field Campo por el cual se ordenará la lista
 * @ApiParam {QueryParam} order Orden ascendente o descendente (-1 desc || 1 asc)
 * @apiExample {curl} Sample usage:
 * curl -X GET \
 * <API_URL>/me/course?page=1&limit=10&field=createdAt&order=1 \
 * -H 'Content-Type: application/json' \
 * -H 'cache-control: no-cache'
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 20O OK{
    {
    "data": [
        {
            "course_id": 0,
            "slug": "facebook-ads",
            "course_id_hash": "5f7424190820e50a6c93ec08",
            "teacher": "",
            "category": "",
            "featured_image": "https://dummyimage.com/600x400/000/fff",
            "name": "Facebook Ads",
            "progress": 80
        },
        {
            "course_id": 4,
            "slug": "diseno-de-logotipos",
            "course_id_hash": "5f74249a0820e50a6c93ec0c",
            "teacher": "Pepper Pots",
            "category": "Diseño Gráfico",
            "featured_image": "https://dummyimage.com/600x400/000/fff",
            "name": "Diseño de Logotipos",
            "progress": 80
        },
        {
            "course_id": 28,
            "slug": "analisis-y-costos",
            "course_id_hash": "5f85ca882fa49446b8a589a2",
            "teacher": "",
            "category": "",
            "featured_image": "https://placeimg.com/640/480/arch",
            "name": "Analisis y Costos",
            "progress": 80
        },
        {
            "course_id": 30,
            "slug": "3ds-max-studio-1",
            "course_id_hash": "5f85cd3f6f86be1f74baf804",
            "teacher": "",
            "category": "",
            "featured_image": "https://placeimg.com/640/480/arch",
            "name": "3DS Max Studio",
            "progress": 80
        },
        {
            "course_id": 29,
            "slug": "3ds-max-studio",
            "course_id_hash": "5f85ccc36f86be1f74baf803",
            "teacher": "",
            "category": "",
            "featured_image": "https://placeimg.com/640/480/arch",
            "name": "3DS Max Studio",
            "progress": 80
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

const getById = async (id) => {
  const populateTeacherOptions = {
    path: "teacher",
    select: "full_name title description socials profile_photo",
  };

  const populateCategoryOptions = { path: "category", select: "name" };

  const find = await Course.findOne({ course_id: id })
    .then(async (result) => result)
    .catch((err) => logger.info(err));

  const populateTeacher = await Teacher.populate(find, populateTeacherOptions)
    .then(async (data) => data)
    .catch((err) => logger.info(err));

  const populateCategory = await Category.populate(populateTeacher, populateCategoryOptions)
    .then(async (data) => data)
    .catch((err) => logger.info(err));

  const populateModules = await Module.populate(populateCategory, { path: "modules" })
    .then(async (data) => data)
    .catch((err) => logger.info(err));

  const populateLessons = await Lesson.populate(populateModules, { path: "modules.lessons" })
    .then(async (data) => data)
    .catch((err) => logger.info(err));
  
  const populateTestimonials = await Testimonial.populate(populateLessons, { path: "testimonials" })
    .then(async (data) => data)
    .catch((err) => logger.info(err));

  const populatePrices = await Price.populate(populateTestimonials, { path: "price" })
    .then(async (data) => data)
    .catch((err) => logger.info(err));
    
  const populatedCourse = courses.CourseByIdEdit(populatePrices);

  return populatedCourse;
};

const getBySlug = async (slug) => {
  const populateTeacherOptions = {
    path: "teacher",
    select: "full_name title description socials profile_photo",
  };

  const populateCategoryOptions = { path: "category", select: "name" };

  const find = await Course.findOne({ slug })
    .then(async (result) => result)
    .catch((err) => logger.info(err));

  const populateTeacher = await Teacher.populate(find, populateTeacherOptions)
    .then(async (data) => data)
    .catch((err) => logger.info(err));

  const populateCategory = await Category.populate(populateTeacher, populateCategoryOptions)
    .then(async (data) => data)
    .catch((err) => logger.info(err));

  const populateModules = await Module.populate(populateCategory, { path: "modules" })
    .then(async (data) => data)
    .catch((err) => logger.info(err));
  
  const populateTestimonials = await Testimonial.populate(populateModules, { path: "testimonials" })
    .then(async (data) => data)
    .catch((err) => logger.info(err));

  const populatePrices = await Price.populate(populateTestimonials, { path: "price" })
    .then(async (data) => data)
    .catch((err) => logger.info(err));
    
  const populatedCourse = courses.CourseById(populatePrices);

  return populatedCourse;
};

const getAllAdmin = async (page, limit, field = "createdAt", order = 1, queryField, queryValue) => {
  const query = {
    [queryField]: queryValue,
    entity_status: STATUS.ACTIVE,
  };
  
  const options = {
    page: page || 1,
    limit: limit || 5,
    sort: { [field]: order },
    collation: {
      locale: "en",
    },
  };

  const populateTeacherOptions = {
    path: "teacher",
    select: "full_name title description socials profile_photo",
  };
  
  const paginate = await Course.paginate(query, options)
    .then(async (result) => result)
    .catch((err) => logger.info(err));
  
  const populateTeacher = await Teacher.populate(paginate.docs, populateTeacherOptions)
    .then(async (data) => data)
    .catch((err) => logger.info(err));

  const populateCategory = await Category.populate(populateTeacher, { path: "category", select: "name" })
    .then(async (data) => data)
    .catch((err) => logger.info(err));

  const populateModules = await Module.populate(populateCategory, { path: "modules" })
    .then(async (data) => data)
    .catch((err) => logger.info(err));
  
  const populateLessons = await Lesson.populate(populateModules, { path: "modules.lessons" })
    .then(async (data) => data)
    .catch((err) => logger.info(err));

  const populatePrices = await Price.populate(populateLessons, { path: "price" })
    .then(async (data) => data)
    .catch((err) => logger.info(err));

  const data = {
    data: populatePrices.map((r) => courses.courseSimpleAdmin(r)),
    paginate: pagination.paginationLabels(paginate),
  };
  
  return data;
};

const getAll = async (page, limit, field = "createdAt", order = 1, queryField, queryValue) => {
  const query = {
    status: STATUS.PUBLISHED,
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

  const populateTeacherOptions = {
    path: "teacher",
    select: "full_name title description socials profile_photo",
  };

  // let countryPrice = country;

  // if (country === "AR") {
  //   countryPrice = "AR";
  // } else if (country === "ES") {
  //   countryPrice = "ES";
  // } else if (country === "MX") {
  //   countryPrice = "MX";
  // } else if (country === "CO") {
  //   countryPrice = "CO";
  // } else {
  //   countryPrice = "US";
  // }

  const populatePrice = {
    path: "price",
    // match: {
    //   country: {
    //     $eq: countryPrice,
    //   },
    // },
  };
  
  const paginate = await Course.paginate(query, options)
    .then(async (result) => result)
    .catch((err) => logger.info(err));
  
  const populateTeacher = await Teacher.populate(paginate.docs, populateTeacherOptions)
    .then(async (data) => data)
    .catch((err) => logger.info(err));

  const populateCategory = await Category.populate(populateTeacher, { path: "category", select: "name" })
    .then(async (data) => data)
    .catch((err) => logger.info(err));

  const populateModules = await Module.populate(populateCategory, { path: "modules" })
    .then(async (data) => data)
    .catch((err) => logger.info(err));
  
  const populateLessons = await Lesson.populate(populateModules, { path: "modules.lessons" })
    .then(async (data) => data)
    .catch((err) => logger.info(err));

  const populatePrices = await Price.populate(populateLessons, populatePrice)
    .then(async (data) => data)
    .catch((err) => logger.info(err));

  const data = {
    data: populatePrices.map((r) => courses.courseSimple(r)),
    paginate: pagination.paginationLabels(paginate),
  };
  
  return data;
};
  
const getAllMyCourses = async (id, page, limit, field = "createdAt", order = 1) => {
  const options = {
    page: page || 1,
    limit: limit || 5,
    sort: { [field]: order },
    collation: {
      locale: "en",
    },
  };

  const populateCategoryOptions = { path: "purchased_courses.category", select: "name" };

  const populateTeacherOptions = { path: "purchased_courses.teacher", select: "full_name title description socials photo" };

  const paginate = await Purchase.paginate({
    user: id,
    item_type: ENTITY_TYPES.COURSE,
    status: PAYMENT_STATUS.APPROVED,
  }, options)
    .then(async (result) => result)
    .catch((err) => logger.info(err));

  const populateCourse = await Course.populate(paginate.docs, { path: "item" })
    .then(async (data) => data)
    .catch((err) => logger.info(err));
  
  const populateCategory = await Category.populate(populateCourse, populateCategoryOptions)
    .then(async (data) => data)
    .catch((err) => logger.info(err));
  
  const populateTeacher = await Teacher.populate(populateCategory, populateTeacherOptions)
    .then(async (data) => data)
    .catch((err) => logger.info(err));

  const finalResult = Object.keys(populateTeacher).map((i) => courses.myCoursesSimple(
    populateTeacher[i].item,
  ));

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < populateTeacher.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    const total = await Total.findOne({ user: id, item: finalResult[i].hash_id })
      .then(async (data) => data)
      .catch((err) => logger.info(err));

    finalResult[i].total_progress = total.progress;
  }

  const data = {
    data: finalResult,
    paginate: pagination.paginationLabels(paginate),
  };
  
  return data;
};

const getMyCourseBySlug = async (slug, id) => {
  const populateTeacherOptions = {
    path: "teacher",
    select: "full_name title description socials profile_photo",
  };

  const populateCategoryOptions = { path: "category", select: "name" };

  const findCourse = await Course.findOne({ slug })
    .then(async (result) => result)
    .catch((err) => logger.info(err));

  const findPurchase = await Purchase.findOne({ item: findCourse._id })
    .then(async (result) => result)
    .catch((err) => logger.info(err));

  // eslint-disable-next-line no-underscore-dangle
  if (findPurchase) {
    const populateTeacher = await Teacher.populate(findCourse, populateTeacherOptions)
      .then(async (data) => data)
      .catch((err) => logger.info(err));

    const populateCategory = await Category.populate(populateTeacher, populateCategoryOptions)
      .then(async (data) => data)
      .catch((err) => logger.info(err));

    const populateModules = await Module.populate(populateCategory, { path: "modules" })
      .then(async (data) => data)
      .catch((err) => logger.info(err));
  
    const populateLessons = await Lesson.populate(populateModules, { path: "modules.lessons" })
      .then(async (data) => data)
      .catch((err) => logger.info(err));

    const populatePrices = await Price.populate(populateLessons, { path: "price" })
      .then(async (data) => data)
      .catch((err) => logger.info(err));

    const populateTestimonials = await Testimonial.populate(populatePrices, { path: "price" })
      .then(async (data) => data)
      .catch((err) => logger.info(err));

    const totalProgress = await Total.findOne({ user: id, item: findCourse._id });
    const progress = await Progress.findOne({ user: id, course: findCourse._id });
    
    const populatedCourse = courses.myCourseById(populateTestimonials,
      totalProgress.progress, progress.progress);

    return populatedCourse;
  }
  return false;
};

const getMyCourseModules = async (slug, id) => {
  // const populateTeacherOptions = {
  //   path: "teacher",
  //   select: "full_name title description socials profile_photo",
  // };

  // const populateCategoryOptions = { path: "category", select: "name" };

  const findCourse = await Course.findOne({ slug })
    .then(async (result) => result)
    .catch((err) => logger.info(err));

  const findPurchase = await Purchase.findOne({ item: findCourse._id })
    .then(async (result) => result)
    .catch((err) => logger.info(err));

  // eslint-disable-next-line no-underscore-dangle
  if (findPurchase) {
    // const populateTeacher = await Teacher.populate(findCourse, populateTeacherOptions)
    //   .then(async (data) => data)
    //   .catch((err) => logger.info(err));

    // const populateCategory = await Category.populate(populateTeacher, populateCategoryOptions)
    //   .then(async (data) => data)
    //   .catch((err) => logger.info(err));

    const populateModules = await Module.populate(findCourse, { path: "modules" })
      .then(async (data) => data)
      .catch((err) => logger.info(err));
  
    const populateLessons = await Lesson.populate(populateModules, { path: "modules.lessons" })
      .then(async (data) => data)
      .catch((err) => logger.info(err));

    // const populatePrices = await Price.populate(populateLessons, { path: "price" })
    //   .then(async (data) => data)
    //   .catch((err) => logger.info(err));

    // const populateTestimonials = await Testimonial.populate(populatePrices, { path: "price" })
    //   .then(async (data) => data)
    //   .catch((err) => logger.info(err));

    const totalProgress = await Total.findOne({ user: id, item: findCourse._id });
    const progress = await Progress.findOne({ user: id, course: findCourse._id });
    
    const populatedCourse = courses.myCouseModules(populateLessons,
      totalProgress.progress, progress.progress);

    return populatedCourse;
  }
  return false;
};

module.exports = {
  getAllAdmin,
  getAllMyCourses,
  getBySlug,
  getById,
  getAll,
  getMyCourseBySlug,
  getMyCourseModules,
};
