/**
 * @apiDefine RequestSucceeded
 * @apiSuccess {Number} status The status code returned by the API.
 * Possible values are 200 (in case of success), or 400 in case of validation errors, or 500
 * for internal server errors.
 * @apiSuccess {String} error An error message explaining why the endpoint failed. This is
 * null in case of success.
 * @apiSuccess {Object} data Any additional data returned by the endpoint.
 */

/**
 * @apiDefine RequestFailed
 *
 * @apiError REQUIRED_FIELD_EXPECTED The payload sent by the HTTP client is invalid.
 *
 * This error is raised whenever the endpoint expects a required field from the HTTP client.
 *
 * Custom error code = 400
 *
 * @apiError UNAUTHORIZED The token sent by the HTTP client is null or wrong.
 *
 * This error is raised whenever an HTTP client submits an empty or wrong token to the endpoint.
 *
 * As a result, the endpoint refuses to process the incoming HTTP request.
 *
 * Custom error code = 401
 *
 * @apiError GENERIC_ERROR_MESSAGE An error occurred while processing the request. This
 * is due to an internal server error.
 *
 * This error is raised whenever the server fails to process an HTTP request due to
 * an internal server error.
 *
 * Custom error code = 500
 */

/**
 * @apiDefine SampleSuccessfulResponse
 * @apiSuccessExample {json} Success Response (example):
 *     HTTP/1.1 200 OK
 *     {
 *       "status": 200,
 *       "data": {
 *          "key": "value"
 *        }
 *     }
 */

/**
 * @apiDefine SampleErrorResponse
 * @apiErrorExample {json} Error Response (example):
 * HTTP/1.1 400 BAD_REQUEST
{
    "error": "INVALID_NAME"

    }
 */
