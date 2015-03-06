import request    from 'supertest'
import { expect } from 'chai'
import app        from '../../src/app'

describe('Productive error route', () => {
  it('returns error response with empty error property', done => {
    request(app).post('/api/v1/projects')
      .expect('Content-Type', /json/)
      .expect({ message: 'Not Authorized', status: 401, error: {} })
      .expect(401, done)
  })
})

describe('Development error route', () => {
  before(() => {
    app.set('env', 'development')
  })

  after(() => {
    app.set('env', 'testing')
  })

  it('returns error response with populated error property', done => {
    request(app).post('/api/v1/projects')
      .expect('Content-Type', /json/)
      .expect(401)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        expect(res.body.status)       .is.a('number')
        expect(res.body.message)      .is.a('string')
        expect(res.body.error.name)   .is.a('string')
        expect(res.body.error.stack)  .is.a('string')
        expect(res.body.error.message).is.a('string')
        done()
      })
  })
})
