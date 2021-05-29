"use sctrict";

const {
  Teacher, Category, Course, Trash,
} = require("../../models");
const { constants: { STATUS, ENTITY_TYPES } } = require("../../tools");

const sendToTrash = async (id, type) => {
  if (type === ENTITY_TYPES.TEACHER) {
    await Teacher.findOneAndUpdate({ teacher_id: id }, { entity_status: STATUS.UNPUBLISHED },
      async (err, result) => {
        if (result) {
          const data = await Trash.create({
            name: result.full_name,
            type: ENTITY_TYPES.TEACHER,
            entity_id: id,
          });
          return data;
        }
        return err;
      });
  } else if (type === ENTITY_TYPES.CATEGORY) {
    await Category.findOneAndUpdate({ category_id: id }, { entity_status: STATUS.UNPUBLISHED },
      async (err, result) => {
        if (result) {
          const data = await Trash.create({
            name: result.name,
            type: ENTITY_TYPES.CATEGORY,
            entity_id: id,
          });
          return data;
        }
        return err;
      });
  } else if (type === ENTITY_TYPES.COURSE) {
    await Course.findOneAndUpdate({ course_id: id }, { entity_status: STATUS.UNPUBLISHED },
      async (err, result) => {
        if (result) {
          const data = await Trash.create({
            name: result.name,
            type: ENTITY_TYPES.COURSE,
            entity_id: id,
          });
          return data;
        }
        return err;
      });
  }

  return "Success";
};

module.exports = {
  sendToTrash,
};
