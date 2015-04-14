import * as error from '../../src/error'

describe('Errors inheritance is correctly setup', () => {

  it('HttpError is instance of HttpError', () => {
    expect(new error.HttpError).instanceof(error.HttpError)
  })

  it('NotFoundError is instance of HttpError', () => {
    expect(new error.NotFoundError).instanceof(error.HttpError)
  })

  it('NotAuthorizedError is instance of HttpError', () => {
    expect(new error.NotAuthorizedError).instanceof(error.HttpError)
  })

  it('BadRequestError is instance of HttpError', () => {
    expect(new error.BadRequestError).instanceof(error.HttpError)
  })

})

describe('Custom error messages can be set', () => {

  it('HttpError can set custom error message', () => {
    expect(new error.HttpError('foobar').message).equal('foobar')
  })

  it('NotFoundError can set custom error message', () => {
    expect(new error.NotFoundError('foobar').message).equal('foobar')
  })

  it('NotAuthorizedError can set custom error message', () => {
    expect(new error.NotAuthorizedError('foobar').message).equal('foobar')
  })

  it('BadRequestError can set custom error message', () => {
    expect(new error.BadRequestError('foobar').message).equal('foobar')
  })

})

describe('Errors have a correct status property', () => {

  it('HttpError has default status of 500', () => {
    expect(new error.HttpError().status).equal(500)
  })

  it('HttpError can set custom status', () => {
    expect(new error.HttpError('Foo', 400).status).equal(400)
  })

  it('NotFoundError has status 404', () => {
    expect(new error.NotFoundError().status).equal(404)
  })

  it('NotAuthorizedError has status 401', () => {
    expect(new error.NotAuthorizedError().status).equal(401)
  })

  it('BadRequestError has status 400', () => {
    expect(new error.BadRequestError().status).equal(400)
  })

})

describe('Errors have a stack trace', () => {

  it('HttpError has a stack strace', () => {
    expect(new error.HttpError().stack).is.a('string')
  })

  it('NotFoundError has a stack trace', () => {
    expect(new error.NotFoundError().stack).is.a('string')
  })

  it('NotAuthorizedError has a stack trace', () => {
    expect(new error.NotAuthorizedError().stack).is.a('string')
  })

  it('BadRequestError has a stack trace', () => {
    expect(new error.BadRequestError().stack).is.a('string')
  })

})
