const { v4: uuid } = require("uuid");
const {
  Student,
} = require("../../models");
const { logger, hash } = require("../../tools");

/**
 * @api {post} /student Crear
 * @apiDescription Crear un estudiante. Este endpoint sirve para hacer sign up.
 * @apiGroup Estudiantes - Publico
 * @ApiParam {String} name Nombre completo del estudiante (Opcional)
 * @ApiParam {String} username Nombre de Usuario del estuadiante (Opcional)
 * @ApiParam {String} password Contraseña del estuadiante (Obligatorio)
 * @ApiParam {String} country País del estuadiante (Opcional)
 * @ApiParam {String} email Email del estuadiante (Obligatorio)
 * @apiExample {json} Input
 *    {
    "name":"John Doe",
    "username": "johndoe",
    "password":"12345",
    "country":"Argentina",
    "email":"johndoe@gmail.com"
}

@apiSuccessExample {json} Success
 *    HTTP/1.1 201 Created{
 *  {
    "CREATED": {
        "code": 201,
        "message": "Created Successfully!"
    },
    "data": {
        "purchased_courses": [],
        "user_type": 2,
        "_id": "5f8e42285a980f0017718ca9",
        "name": "John Doe",
        "username": "johndoe",
        "password": "12345",
        "country": "Argentina",
        "email": "johndoe@gmail.com",
        "createdAt": "2020-10-20T01:49:28.699Z",
        "updatedAt": "2020-10-20T01:49:28.699Z",
        "student_id": 31,
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
      
const createStudent = async (body) => {
  const studentBody = body;
  const findEmail = await Student.findOne({ email: studentBody.email })
    .then((result) => result)
    .catch((err) => err);
  if (!findEmail) {
    studentBody.password = hash.hashPassword(studentBody.password);
    hash.hashPassword(studentBody.password);
    studentBody.activation_code = uuid();
    const student = new Student(studentBody);
    await student.save()
      .then(async (result) => result)
      .catch((err) => logger.info(err));
    return student;
  }
  return false;
};
    
module.exports = {
  createStudent,
};
