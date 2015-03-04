export class HttpError extends Error { }

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
