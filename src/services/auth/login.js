"use sctrict";

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { Student, Session } = require("../../models");
const {
  logger, hash, constants: { EXPIRATION_TOKEN },
} = require("../../tools");

dotenv.config();

/**
 * @api {post} /login Iniciar sesión
 * @apiDescription Autentica al usuario y le retorna un token de sesión
 * @apiGroup Sesión - Publico
 * @ApiParam {String} username Username de usuario (Opcional)
 * @ApiParam {String} password Contraseña de usuario (Obligatorio)
 * @ApiParam {String} email Email de usuario (Opcional)
 * @ApiParam {String} ipAddress Dirección IP de donde se conecta el usuario (Opcional)
 * @apiExample {json} Input
 *    {
    "username": "admin",
    "password": "contrasena"
}
@apiSuccessExample {json} Success
 *    HTTP/1.1 201 Created{
 *   {
    "LOGIN": {
        "code": 205,
        "message": "Login Successfully!"
    },
    "data": {
        "session": {
            "status": true,
            "_id": "5f8d69a7f2fe010e049444f4",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
    }
}
 *}
 * @apiErrorExample {json} Error
 *    HTTP/1.1 400 Bad Request
 * {
    "error": "INVALID_EMAIL"
  }
 */

const login = async (username, password, email, ipAddress = "") => {
  const data = await Student.findOne((username ? { username } : { email }))
    // eslint-disable-next-line no-shadow
    .then((student) => {
      const hashPassword = student.password;
      const checkPassword = hash.verifyPassword(password, hashPassword);
      if (checkPassword) {
        const payload = {
          id: student.id,
          email: student.email,
          username: student.username,
          user_type: student.user_type,
        };

        const token = jwt.sign(payload, process.env.JWT_KEY, {
          expiresIn: EXPIRATION_TOKEN,
        });

        const saveSession = {
          token, ipAddress,
        };

        const session = new Session(saveSession);
        session.save();

        return { session, token };
      }
      return false;
    })
    .catch((err) => logger.info(err));
  return data;
};

module.exports = {
  login,
};
