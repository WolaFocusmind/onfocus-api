/* eslint-disable security/detect-object-injection */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */

"use sctrict";

const {
  Course, Category, Teacher, Testimonial, Price, Module, Lesson, Progress, Total,
} = require("../../models");
const { logger, store } = require("../../tools");

/**
 * @api {put} /course/:id Actualizar
 * @apiDescription Actualizar un curso ya creado. Incluyendo su estado y otros campos.
 * @apiGroup Cursos - Admin
 *
 * @ApiParam {id} course_id course_id autoincremental del curso a actualizar
 * @ApiParam {Object} Body Body con todos los campos a actualizar del curso
 * @apiExample {json} Input
 *    {
    "name": "Marketing Digital Super Experto"
}
@apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK {
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
  const courseOriginal = await Course.findOne({ course_id: id })
    .then(async (result) => result)
    .catch((err) => logger.info(err));

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
    modules: [],
    price: [],
    testimonials: [],
  };
  
  if (body.featured_image !== courseOriginal.featured_image) {
    const buf = Buffer.from(body.featured_image.replace(/^data:image\/\w+;base64,/, ""), "base64");
    const assetStore = await store.store(buf);

    courseBody.featured_image = assetStore.Location;
  }
  
  const courseSave = await Course.findOneAndUpdate({ course_id: id }, courseBody, { new: true })
    .then(async (result) => result)
    .catch((err) => logger.info(err));

  if (courseSave) {
    if (courseOriginal.category !== courseSave.category) {
      await Category.updateOne({ _id: courseOriginal.category },
        { $pull: { courses: courseOriginal._id } })
        .then(async (result) => result)
        .catch((err) => logger.info(err));

      await Category.updateOne({ _id: courseSave.category },
        { $addToSet: { courses: courseSave._id } })
        .then(async (result) => result)
        .catch((err) => logger.info(err));
    }
      
    if (courseOriginal.teacher !== courseSave.teacher) {
      await Teacher.updateOne({ _id: courseOriginal.teacher },
        { $pull: { courses: courseSave._id } })
        .then(async (result) => result)
        .catch((err) => logger.info(err));

      await Teacher.updateOne({ _id: courseSave.teacher },
        { $addToSet: { courses: courseSave._id } })
        .then(async (result) => result)
        .catch((err) => logger.info(err));
    }

    const testimonialsBody = body.testimonials;

    if (Array.isArray(testimonialsBody) && testimonialsBody.length) {
      await Testimonial.deleteMany({ course: courseSave._id })
        .then(async (result) => result)
        .catch((err) => logger.info(err));

      for (let i = 0; i < testimonialsBody.length; i++) {
        // eslint-disable-next-line max-len
        let profilePicture;
        if (testimonialsBody[i].studentImage) {
          const buf = Buffer.from(testimonialsBody[i].studentImage.replace(/^data:image\/\w+;base64,/, ""), "base64");
          const assetStore = await store.store(buf);
          testimonialsBody[i].studentImage = assetStore.Location;
          profilePicture = testimonialsBody[i].studentImage;
        } else {
          profilePicture = testimonialsBody[i].profile_picture;
        }
        
        const testimonialCopy = {
          name: testimonialsBody[i].name,
          testimonial: testimonialsBody[i].testimonial,
          profile_picture: profilePicture,
          course: courseSave._id,
        };

        const testimonial = new Testimonial(testimonialCopy);
        const testimonialSave = await testimonial.save()
          .then(async (result) => result)
          .catch((err) => logger.info(err));

        await Course.updateOne({ _id: courseSave._id },
          { $addToSet: { testimonials: testimonialSave._id } })
          .then(async (result) => result)
          .catch((err) => logger.info(err));
      }
    }

    const pricesBody = body.price;

    if (Array.isArray(pricesBody) && pricesBody.length) {
      await Price.deleteMany({ course: courseSave._id })
        .then(async (result) => result)
        .catch((err) => logger.info(err));
    
      for (let i = 0; i < pricesBody.length; i++) {
      // eslint-disable-next-line security/detect-object-injection
        const priceCopy = {
          country: pricesBody[i].country,
          currency: pricesBody[i].currency,
          real_price: pricesBody[i].real_price,
          course: courseSave._id,
        };
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
      await Module.deleteMany({ course: courseSave._id })
        .then(async (result) => result)
        .catch((err) => logger.info(err));

      for (let i = 0; i < modulesBody.length; i++) {
        const modulesCopy = {
          name: modulesBody[i].name,
          description: modulesBody[i].description,
          course: courseSave._id,
        };

        const modules = new Module(modulesCopy);
        const modulesSave = await modules.save()
          .then(async (result) => result)
          .catch((err) => logger.info(err));

        await Course.updateOne({ _id: courseSave._id },
          { $addToSet: { modules: modulesSave._id } });

        const lessonBody = body.modules[i].lessons;

        await Lesson.deleteMany({ module: modulesSave._id })
          .then(async (result) => result)
          .catch((err) => logger.info(err));

        for (let index = 0; index < lessonBody.length; index++) {
          const lessonsCopy = {
            name: lessonBody[index].name,
            video: lessonBody[index].video,
            module: modulesSave._id,
            duration: lessonBody[index].duration,
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
  return courseSave;
};

const pushProgress = async (id, courseId, body) => {
  const { moduleId, lessonId } = body;
  
  const findProgress = await Progress.findOne({ user: id, course: courseId })
    .then(async (result) => result)
    .catch((err) => logger.info(err));

  const { progress } = findProgress;
  progress[moduleId].lessons[lessonId].status = true;

  let totalLessons = 0;

  for (let i = 0; i < progress.length; i++) {
    for (let x = 0; x < progress[i].lessons.length; x++) {
      totalLessons++;
    }
  }
  const totalProgress = Math.round(100 / totalLessons);

  await Total.updateOne({ user: id, item: courseId },
    { $inc: { progress: totalProgress } })
    .then(async (result) => result)
    .catch((err) => logger.info(err));

  const progressFinal = await Total.findOne({ user: id, item: courseId })
    .then(async (result) => result)
    .catch((err) => logger.info(err));

  if (progressFinal.progress === 99) {
    await Total.updateOne({ user: id, item: courseId },
      { progress: 100 })
      .then(async (result) => result)
      .catch((err) => logger.info(err));
  }

  let completedModule = false;
  let moduleCount = 0;

  progress[moduleId].lessons.map((i) => {
    if (i.status === true) { return moduleCount++; }
    return false;
  });
  
  if (moduleCount === progress[moduleId].lessons.length) { completedModule = true; }

  progress[moduleId].status = completedModule;

  const progressUpdate = await Progress.updateOne({ user: id, course: courseId },
    { progress })
    .then(async (result) => result)
    .catch((err) => logger.info(err));

  return progressUpdate;
};

module.exports = {
  byId,
  pushProgress,
};
