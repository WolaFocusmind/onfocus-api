const courseSimpleAll = (row) => ({
  // eslint-disable-next-line no-underscore-dangle
  course_id_hash: row._id,
  teacher: row.teacher ? row.teacher.full_name : "",
  category: row.category ? row.category.name : "",
  name: row.name,
  slug: row.slug,
  createdAt: row.createdAt,
  status: row.status,
  entity_status: row.entity_status,
});

const courseSimple = (row) => ({
  course_id: row.course_id,
  // eslint-disable-next-line no-underscore-dangle
  course_id_hash: row._id,
  teacher: row.teacher ? row.teacher.full_name : "",
  // price: {
  //   country: row.price[0].country,
  //   currency: row.price[0].currency,
  //   real_price: row.price[0].real_price,
  //   final_price: row.price[0].final_price,
  //   offer_discount: row.price[0].offer_discount,
  //   offer_ends: row.price[0].offer_ends,
  // },
  price: row.price,
  total_students: row.total_students,
  category: row.category ? row.category.name : "",
  name: row.name,
  slug: row.slug,
  createdAt: row.createdAt,
  featured_image: row.featured_image,
  status: row.status,
});

const courseSimpleAdmin = (row) => ({
  course_id: row.course_id,
  // eslint-disable-next-line no-underscore-dangle
  course_id_hash: row._id,
  teacher: row.teacher ? row.teacher.full_name : "",
  total_students: row.total_students,
  category: row.category ? row.category.name : "",
  name: row.name,
  slug: row.slug,
  createdAt: row.createdAt,
  featured_image: row.featured_image,
  status: row.status,
});

const myCoursesSimple = (row) => ({
  // eslint-disable-next-line no-underscore-dangle
  hash_id: row._id,
  course_id: row.course_id,
  slug: row.slug,
  // eslint-disable-next-line no-underscore-dangle
  course_id_hash: row._id,
  teacher: row.teacher ? row.teacher.full_name : "",
  category: row.category ? row.category.name : "",
  featured_image: row.featured_image,
  name: row.name,
  total_progress: "",
});

const myCourseById = (row, total, progress) => ({
  course_id: row.course_id,
  // eslint-disable-next-line no-underscore-dangle
  course_id_hash: row._id,
  title: row.name,
  slug: row.slug,
  category: row.category ? row.category.name : "",
  featured_image: row.featured_image,
  status: row.status,
  teacher: row.teacher ? row.teacher : "",
  total_students: row.total_students,
  total_duration: row.total_duration,
  total_progress: total,
  description: row.description,
  creation_date: row.createdAt,
  video_intro: row.video_intro,
  total_modules: row.total_modules,
  about_this_course: row.about_this_course,
  course_details_items: row.course_details_items,
  course_target_items: row.course_target_items,
  modules: row.modules.map((value, i) => (
    {
      name: row.modules[`${i}`].name,
      completed: progress[`${i}`].status,
      module_id: row.modules[`${i}`].module_id,
      description: row.modules[`${i}`].slug,
      total_duration: row.modules[`${i}`].total_duration,
      lessons: row.modules[`${i}`].lessons.map((val, x) => ({
        name: row.modules[`${i}`].lessons[`${x}`].name,
        duration: row.modules[`${i}`].lessons[`${x}`].duration,
        video: row.modules[`${i}`].lessons[`${x}`].video,
        completed: progress[`${i}`].lessons[`${x}`].status,
      })),
    }
  )),
});

const CourseById = (row) => ({
  course_id: row.course_id,
  // eslint-disable-next-line no-underscore-dangle
  course_id_hash: row._id,
  title: row.name,
  slug: row.slug,
  category: row.category ? row.category.name : "",
  featured_image: row.featured_image,
  status: row.status,
  teacher: row.teacher ? row.teacher : "",
  total_students: row.total_students,
  total_duration: row.total_duration,
  description: row.description,
  creation_date: row.createdAt,
  video_intro: row.video_intro,
  total_modules: row.total_modules,
  about_this_course: row.about_this_course,
  course_details_items: row.course_details_items,
  course_target_items: row.course_target_items,
  price: row.price.map((value, i) => (
    {
      price_id: row.price[`${i}`].price_id,
      country: row.price[`${i}`].country,
      real_price: row.price[`${i}`].real_price,
      final_price: row.price[`${i}`].final_price,
      offer_discount: row.price[`${i}`].offer_discount,
      offer_ends: row.price[`${i}`].offer_ends,
      currency: row.price[`${i}`].currency,
    }
  )),
  testimonials: row.testimonials.map((value, i) => (
    {
      name: row.testimonials[`${i}`].name,
      testimonial_id: row.testimonials[`${i}`].testimonial_id,
      testimonial: row.testimonials[`${i}`].testimonial,
      profile_picture: row.testimonials[`${i}`].profile_picture,
    }
  )),
  modules: row.modules.map((value, i) => (
    {
      name: row.modules[`${i}`].name,
      module_id: row.modules[`${i}`].module_id,
      description: row.modules[`${i}`].description,
      slug: row.modules[`${i}`].slug,
      total_duration: row.modules[`${i}`].total_duration,
    }
  )),
});

const CourseByIdEdit = (row) => ({
  course_id: row.course_id,
  // eslint-disable-next-line no-underscore-dangle
  course_id_hash: row._id,
  title: row.name,
  slug: row.slug,
  category: row.category,
  featured_image: row.featured_image,
  status: row.status,
  teacher: row.teacher ? row.teacher : "",
  total_students: row.total_students,
  total_duration: row.total_duration,
  description: row.description,
  creation_date: row.createdAt,
  video_intro: row.video_intro,
  total_modules: row.total_modules,
  about_this_course: row.about_this_course,
  course_details_items: row.course_details_items,
  course_target_items: row.course_target_items,
  price: row.price.map((value, i) => (
    {
      price_id: row.price[`${i}`].price_id,
      country: row.price[`${i}`].country,
      real_price: row.price[`${i}`].real_price,
      currency: row.price[`${i}`].currency,
      final_price: row.price[`${i}`].final_price,
      offer_discount: row.price[`${i}`].offer_discount,
      offer_ends: row.price[`${i}`].offer_ends,
      offer_starts: row.price[`${i}`].offer_starts,
    }
  )),
  testimonials: row.testimonials.map((value, i) => (
    {
      name: row.testimonials[`${i}`].name,
      testimonial_id: row.testimonials[`${i}`].testimonial_id,
      testimonial: row.testimonials[`${i}`].testimonial,
      profile_picture: row.testimonials[`${i}`].profile_picture,
    }
  )),
  modules: row.modules.map((value, i) => (
    {
      name: row.modules[`${i}`].name,
      module_id: row.modules[`${i}`].module_id,
      description: row.modules[`${i}`].description,
      slug: row.modules[`${i}`].slug,
      total_duration: row.modules[`${i}`].total_duration,
      lessons: row.modules[`${i}`].lessons,
    }
  )),
});

const myCouseModules = (row, total, progress) => ({
  course_id: row.course_id,
  // eslint-disable-next-line no-underscore-dangle
  course_id_hash: row._id,
  title: row.name,
  slug: row.slug,
  total_progress: total,
  total_modules: row.total_modules,
  modules: row.modules.map((value, i) => (
    {
      name: row.modules[`${i}`].name,
      completed: progress[`${i}`].status,
      module_id: row.modules[`${i}`].module_id,
      description: row.modules[`${i}`].slug,
      total_duration: row.modules[`${i}`].total_duration,
      lessons: row.modules[`${i}`].lessons.map((val, x) => ({
        name: row.modules[`${i}`].lessons[`${x}`].name,
        duration: row.modules[`${i}`].lessons[`${x}`].duration,
        video: row.modules[`${i}`].lessons[`${x}`].video,
        completed: progress[`${i}`].lessons[`${x}`].status,
      })),
    }
  )),
});

module.exports = {
  courseSimpleAll,
  courseSimpleAdmin,
  courseSimple,
  myCoursesSimple,
  myCourseById,
  myCouseModules,
  CourseById,
  CourseByIdEdit,
};
