"use sctrict";

const { Student } = require("../../models");
const {
  hash: { hashPassword, verifyPassword }, logger,
  httpCodes: { CHECK_PASSWORD, UPDATED_PASSWORD },
} = require("../../tools");

/**
 * @api {post} /me/password Cambiar contraseña
 * @apiDescription Cambiar contraseña estando conectado desde la sección del perfil del usuario
 * @apiGroup Perfil - Publico
 * @apiParam {string} oldPassword Password actual del usuario (Obligatorio)
 * @apiParam {string} newPassword Password nuevo del usuario (Obligatorio)
 * @apiParam {string} newPasswordConfirm Confirmación Password nuevo del usuario (Obligatorio)
 * @apiParam {email} email Email del usuario. Esto viene del token (Obligatorio)
 * @apiHeader (Token) {String} token Token de la sesión del usuario (Obligatorio).
 * @apiExample {json} Input
 *    {
    "oldPassword": "1q2w3e4r",
    "newPassword": "1q2w3e4r!!",
    "newPasswordConfirm": "1q2w3e4r!!"
}
@apiSuccessExample {json} Success
 *    HTTP/1.1 201 Created{
 *  {
    "data": {
        "code": 210,
        "message": "Password updated"
    }
}
 *}
 * @apiErrorExample {json} Error
 *    HTTP/1.1 200 OK
 * {
    "data": {
        "code": 410,
        "message": "Please check your password"
    }
}
 */

const changePassword = async (oldPassword, newPassword, newPasswordConfirm, email) => {
  const student = await Student.findOne({ email })
    .then(async (result) => result)
    .catch((err) => logger.info(err));

  const oldHashPassword = student.password;
  
  const checkPassword = verifyPassword(oldPassword, oldHashPassword);
  
  if (checkPassword && (newPassword === newPasswordConfirm)) {
    const updatePassword = await Student.updateOne({ email },
      { password: hashPassword(newPasswordConfirm) })
      .then(async (result) => result)
      .catch((err) => logger.info(err));

    if (updatePassword) { return UPDATED_PASSWORD; }
  } else {
    return CHECK_PASSWORD;
  }
  return false;
};

module.exports = {
  changePassword,
};
