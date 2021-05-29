const {
  Trash, Teacher, Course, Category,
} = require("../../models");
  
const { constants: { ENTITY_TYPES, STATUS } } = require("../../tools");
const { logger } = require("../../tools");
  
const restoreTrashById = async (id) => {
  const trash = await Trash.findOneAndDelete({ entity_id: id })
    .then(async (result) => result)
    .catch((err) => logger.info(err));

  switch (trash.type) {
  case ENTITY_TYPES.TEACHER:
    await Teacher.updateOne({ teacher_id: id }, { entity_status: STATUS.PUBLISHED })
      .then(async (result) => result)
      .catch((err) => logger.info(err));
    break;
    
  case ENTITY_TYPES.COURSE:
    await Course.updateOne({ course_id: id }, { entity_status: STATUS.PUBLISHED })
      .then(async (result) => result)
      .catch((err) => logger.info(err));
    break;
    
  case ENTITY_TYPES.CATEGORY:
    await Category.updateOne({ category_id: id }, { entity_status: STATUS.PUBLISHED })
      .then(async (result) => result)
      .catch((err) => logger.info(err));
    break;
  
  default:
    break;
  }

  return trash;
};
  
module.exports = {
  restoreTrashById,
};
