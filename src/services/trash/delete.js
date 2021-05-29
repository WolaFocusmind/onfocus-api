const {
  Trash, Teacher, Course, Category,
} = require("../../models");
  
const { logger, httpCodes: { DELETED } } = require("../../tools");
const { constants: { ENTITY_TYPES } } = require("../../tools");
  
const byId = async (id) => {
  const trash = await Trash.findOneAndDelete({ entity_id: id })
    .then(async (result) => result)
    .catch((err) => logger.info(err));
  
  switch (trash.type) {
  case ENTITY_TYPES.TEACHER:
    await Teacher.findOneAndDelete({ teacher_id: id })
      .then(async (result) => result)
      .catch((err) => logger.info(err));
    break;
    
  case ENTITY_TYPES.COURSE:
    await Course.findOneAndDelete({ course_id: id })
      .then(async (result) => result)
      .catch((err) => logger.info(err));

    break;
    
  case ENTITY_TYPES.CATEGORY:
    await Category.findOneAndDelete({ category_id: id })
      .then(async (result) => result)
      .catch((err) => logger.info(err));
    break;
  
  default:
    break;
  }
  
  return { DELETED };
};
  
module.exports = {
  byId,
};
