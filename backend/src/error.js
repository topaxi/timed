export class HttpError extends Error {
  constructor(message = '', ...args) {
    super(message, ...args)

    this.message = message
    this.stack   = (new Error).stack
  }
}

export class NotFoundError extends HttpError {
  constructor(...args) {
    super(...args)

    this.status = 404
  }
}

export class NotAuthorizedError extends HttpError {
  constructor(...args) {
    super(...args)

    this.status = 401
  }
}

export class BadRequestError extends HttpError {
  constructor(...args) {
    super(...args)

    this.status = 400
  }
}
