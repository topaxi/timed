export class HttpError extends Error {
  /* istanbul ignore next */
  constructor(message = 'Request Error', status = 500) {
    super(message)

    this.status = status
  }
}

export class NotFoundError extends HttpError {
  /* istanbul ignore next */
  constructor(message = 'Not Found') {
    return super(message, 404)
  }
}

export class NotAuthorizedError extends HttpError {
  /* istanbul ignore next */
  constructor(message = 'Not Authorized') {
    return super(message, 401)
  }
}

export class BadRequestError extends HttpError {
  /* istanbul ignore next */
  constructor(message = 'Bad Request') {
    return super(message, 400)
  }
}
