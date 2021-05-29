"use sctrict";

const { Teacher, Course } = require("../../models");
const { logger, store } = require("../../tools");

/**
 * @api {post} /teacher Crear
 * @apiDescription Crear una profesor.
 * @apiGroup Profesores - Admin
 * @ApiParam {string} full_name Nombre del profesor (Obligatorio)
 * @ApiParam {base64} profile_photo Foto de perfil del profesor en base64 (Opcional)
 * @ApiParam {string} title Titulo del profesor (Opcional)
 * @ApiParam {string} description Descripción del profesor (Opcional)
 * @ApiParam {Object} socials Redes sociales del profesor (Opcional)
 * @ApiParam {Array[]} courses Array con cursos pertenecientes al profesor (Opcional)
 * @apiExample {json} Input
 *    {
    "full_name": "Pablo Perez",
    "profile_photo": "",
    "title": "Especialista en Marketing Digital",
    "description":"Me especializo en Marketin Digital y otras cosas más",
    "socials": {
            "instagram" : "instagram.com",
            "twitter" : "twitter.com",
            "facebook" : "facebook",
            "linkedin" : "linkedin",
            "youtube" : "youtube"
        },
    "courses": []
}

@apiSuccessExample {json} Success
 *    HTTP/1.1 201 Created{
 {
    "CREATED": {
        "code": 201,
        "message": "Created Successfully!"
    },
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
 *}
 * @apiErrorExample {json} Error
 *    HTTP/1.1 500 Internal Server Error
 * {
    "error": "INVALID_NAME"
  }
 */

const createTeacher = async (body) => {
  const teacherBody = body;

  if (body.profile_photo) {
    const buf = Buffer.from(body.profile_photo.replace(/^data:image\/\w+;base64,/, ""), "base64");
    const assetStore = await store.store(buf);

    teacherBody.profile_photo = assetStore.Location;
  }

  const teacher = new Teacher(teacherBody);
  
  if (teacher.courses.length) {
    const coursesTeacherId = teacher.courses;
    
    for (let i = 0; i < coursesTeacherId.length; i += 1) {
      Course.updateOne(
        { _id: coursesTeacherId[`${i}`] },
        // eslint-disable-next-line no-underscore-dangle
        { teacher: teacher._id },
        (err, result) => {
          if (err) {
            logger.info(err);
          } else {
            logger.info(result);
          }
        },
      );
    }
  }
  
  return teacher
    .save()
    .then(() => teacher)
    .catch((error) => error);
};

module.exports = {
  createTeacher,
};
