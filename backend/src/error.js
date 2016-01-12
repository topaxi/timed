export class HttpError extends Error {
  constructor(message = 'Request Error', status = 500) {
    super(message)

    this.status = status
  }
}

export class NotFoundError extends HttpError {
  constructor(message = 'Not Found') {
    super(message, 404)
  }
}

export class NotAuthorizedError extends HttpError {
  constructor(message = 'Not Authorized') {
    super(message, 401)
  }
}

export class BadRequestError extends HttpError {
  constructor(message = 'Bad Request') {
    super(message, 400)
  }
}
