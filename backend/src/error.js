export class HttpError extends Error {
  constructor(message = 'Request Error', status = 500) {
    super(message)

    this.status = status
  }
}

export class NotFoundError extends HttpError {
  constructor(message = 'Not Found') {
    return super(message, 404)
  }
}

export class NotAuthorizedError extends HttpError {
  constructor(message = 'Not Authorized') {
    return super(message, 401)
  }
}

export class BadRequestError extends HttpError {
  constructor(message = 'Bad Request') {
    return super(message, 400)
  }
}
