"use sctrict";

const { Session } = require("../../models");
const { logger, constants: { SESSION_STATUS } } = require("../../tools");

/**
 * @api {get} /logout Cerrar sesión
 * @apiDescription Finaliza la session del usuario al usuario y le retorna un token de sesión
 * @apiGroup Sesión - Publico
 * @apiHeader (Token) {String} token Token de la sesión del usuario (Obligatorio).
 * @apiExample {curl} Sample usage:
 * curl -X GET \
 * <API_URL>/login \
 * -H 'Content-Type: application/json' \
 * -H 'cache-control: no-cache'
@apiSuccessExample {json} Success
 *    HTTP/1.1 201 Created{
 *   {
    "LOGOUT": {
        "code": 206,
        "message": "Logout Successfully!"
    },
    "data": {
        "n": 1,
        "nModified": 1,
        "opTime": {
            "ts": "6885277190502481921",
            "t": 7
        },
        "electionId": "7fffffff0000000000000007",
        "ok": 1,
        "$clusterTime": {
            "clusterTime": "6885277190502481921",
            "signature": {
                "hash": "FIe2P/YcYfwPQMImci7r+TMBIhs=",
                "keyId": "6877718696601583619"
            }
        },
        "operationTime": "6885277190502481921"
    }
}
 *}
 * @apiErrorExample {json} Error
 *    HTTP/1.1 400 Bad Request
 * {
    "error": "INVALID_TOKEN"
  }
 */

const logout = async (token) => {
  const update = await Session.updateOne({ token }, { status: SESSION_STATUS.OFFLINE })
    .then(async (result) => result)
    .catch((err) => logger.info(err));
  return update;
};

module.exports = {
  logout,
};
