/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable security/detect-object-injection */
/* eslint-disable no-underscore-dangle */
const {
  Course, Category, Teacher, Testimonial, Price, Module, Lesson, Progress, Total, Student,
} = require("../../models");
const { logger, store } = require("../../tools");

/**
 * @api {post} /course Crear
 * @apiDescription Crear un nuevo curso. Este endpoint recibe todo los objetos de modulos,
 * precio, recomendaciones y otras entidades que componen un curso.
 * @apiGroup Cursos - Admin
 * @ApiParam {String} name Nombre del Curso (Obligatorio)
 * @ApiParam {String} description Descripción del Curso (Opcional)
 * @apiExample {json} Input
 *    {
 *      "name": "Nombre del Curso",
 *      "description": "Descripción del curso"
 *    }
@apiSuccessExample {json} Success
 *    HTTP/1.1 201 Created{
 *   {
    "CREATED": {
        "code": 201,
        "message": "Created Successfully!"
    },
    "data": {
        "modules": [],
        "price": [],
        "testimonials": [],
        "status": true,
        "entity_status": true,
        "total_students": 0,
        "course_details_items": [],
        "course_target_items": [],
        "_id": "5f8d71eadebde50d00c2cd8b",
        "slug_history": [
            "nombre-de-la-categria"
        ],
        "name": "Nombre de la categría",
        "description": "Descripción del curso",
        "slug": "nombre-de-la-categria",
        "createdAt": "2020-10-19T11:00:58.675Z",
        "updatedAt": "2020-10-19T11:00:58.675Z",
        "course_id": 32,
        "__v": 0
    }
}
 *}
 * @apiErrorExample {json} Error
 *    HTTP/1.1 400 Bad request
 * {
    "error": "INVALID_NAME"
  }
 */

const createCourse = async (body) => {
  const courseBody = {
    name: body.name,
    description: body.description,
    teacher: body.teacher,
    category: body.category,
    video_intro: body.video_intro,
    total_modules: body.total_modules,
    total_duration: body.total_duration,
    about_this_course: body.about_this_course,
    course_details_items: body.course_details_items,
    course_target_items: body.course_target_items,
    status: body.status,
  };
  
  if (body.featured_image) {
    const buf = Buffer.from(body.featured_image.replace(/^data:image\/\w+;base64,/, ""), "base64");
    const assetStore = await store.store(buf);

    courseBody.featured_image = assetStore.Location;
  }
  
  const course = new Course(courseBody);
  const courseSave = await course.save()
    .then(async (result) => result)
    .catch((err) => logger.info(err));

  if (courseSave) {
    await Category.updateOne({ _id: courseSave.category },
      { $addToSet: { courses: courseSave._id } })
      .then(async (result) => result)
      .catch((err) => logger.info(err));
      
    await Teacher.updateOne({ _id: courseSave.teacher },
      { $addToSet: { courses: courseSave._id } })
      .then(async (result) => result)
      .catch((err) => logger.info(err));

    const testimonialsBody = body.testimonials;

    if (Array.isArray(testimonialsBody) && testimonialsBody.length) {
      for (let i = 0; i < testimonialsBody.length; i++) {
      // eslint-disable-next-line security/detect-object-injection

        if (testimonialsBody[i].studentImage) {
          const buf = Buffer.from(testimonialsBody[i].studentImage.replace(/^data:image\/\w+;base64,/, ""), "base64");
          const assetStore = await store.store(buf);
    
          testimonialsBody[i].studentImage = assetStore.Location;
        }
        const testimonialCopy = {
          name: testimonialsBody[i].name,
          testimonial: testimonialsBody[i].testimonial,
          profile_picture: testimonialsBody[i].studentImage,
          course: courseSave._id,
        };
        const testimonial = new Testimonial(testimonialCopy);
        const testimonialSave = await testimonial.save()
          .then(async (result) => result)
          .catch((err) => logger.info(err));

        await Course.updateOne({ _id: courseSave._id },
          { $addToSet: { testimonials: testimonialSave._id } });
      }
    }

    const pricesBody = body.price;

    if (Array.isArray(pricesBody) && pricesBody.length) {
      for (let i = 0; i < pricesBody.length; i++) {
        const priceCopy = {
          country: pricesBody[i].country,
          currency: pricesBody[i].currency,
          real_price: pricesBody[i].real_price,
          course: courseSave._id,
        };
        // eslint-disable-next-line security/detect-object-injection
        const price = new Price(priceCopy);
        const priceSave = await price.save()
          .then(async (result) => result)
          .catch((err) => logger.info(err));

        await Course.updateOne({ _id: courseSave._id },
          { $addToSet: { price: priceSave._id } });
      }
    }

    const modulesBody = body.modules;

    if (Array.isArray(modulesBody) && modulesBody.length) {
      for (let i = 0; i < modulesBody.length; i++) {
        const modulesCopy = {
          name: modulesBody[i].name,
          description: modulesBody[i].description,
          course: courseSave._id,
          total_duration: 0,
        };

        const modules = new Module(modulesCopy);
        const modulesSave = await modules.save()
          .then(async (result) => result)
          .catch((err) => logger.info(err));

        await Course.updateOne({ _id: courseSave._id },
          { $addToSet: { modules: modulesSave._id } });

        const lessonBody = body.modules[i].lessons;

        for (let index = 0; index < lessonBody.length; index++) {
          const lessonsCopy = {
            name: lessonBody[index].name,
            video: lessonBody[index].video,
            duration: lessonBody[index].duration,
            module: modulesSave._id,
          };

          const lessons = new Lesson(lessonsCopy);
          const lessonsSave = await lessons.save()
            .then(async (result) => result)
            .catch((err) => logger.info(err));

          await Module.updateOne({ _id: modulesSave._id },
            { $addToSet: { lessons: lessonsSave._id } });
        }
      }
    }
  }
  return course;
};

const initProgress = async (courses, user) => {
  const coursesArray = courses;

  for (let i = 0; i < coursesArray.length; i++) {
    const progress = [];
    const findCourses = await Course.findOne({ _id: coursesArray[i] }, "modules")
      .then(async (result) => result)
      .catch((err) => logger.info(err));

    const populateModules = await Module.populate(findCourses, { path: "modules", select: "lessons" })
      .then(async (data) => data)
      .catch((err) => logger.info(err));

    const populateLessons = await Lesson.populate(populateModules, { path: "modules.lessons", select: "name" })
      .then(async (data) => data)
      .catch((err) => logger.info(err));

    const { modules } = populateLessons;

    for (let x = 0; x < modules.length; x++) {
      progress.push({ status: false, lessons: [] });

      for (let a = 0; a < modules[x].lessons.length; a++) {
        progress[x].lessons.push({ status: false });
      }
    }
    await Student.updateOne({ _id: user[i] },
      { $addToSet: { purchased_courses: coursesArray[i] } })
      .then(async (result) => result)
      .catch((err) => logger.info(err));

    const createProgress = await Progress.create({
      user: user[i],
      course: coursesArray[i],
      progress,
    })
      .then(async (data) => data)
      .catch((err) => logger.info(err));
    
    await Total.create({
      user: user[i],
      item: coursesArray[i],
    })
      .then(async (data) => data)
      .catch((err) => logger.info(err));

    return createProgress;
  }
  return true;
};
  
module.exports = {
  createCourse,
  initProgress,
};
