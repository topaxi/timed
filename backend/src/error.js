export class HttpError extends Error {
  /* istanbul ignore next */
  constructor(message = 'Request Error', status = 500) {
    super(message)

    this.status  = status
    this.message = message
    this.stack   = (new Error).stack
  }
}

export class NotFoundError extends HttpError {
  /* istanbul ignore next */
  constructor(message = 'Not Found') {
    super(message, 404)
  }
}

export class NotAuthorizedError extends HttpError {
  /* istanbul ignore next */
  constructor(message = 'Not Authorized') {
    super(message, 401)
  }
}

export class BadRequestError extends HttpError {
  /* istanbul ignore next */
  constructor(message = 'Bad Request') {
    super(message, 400)
  }
}
