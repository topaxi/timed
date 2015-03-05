import co                from 'co'
import request           from 'supertest'
import { expect }        from 'chai'
import app               from '../../../../src/app'
import { User }          from '../../../../models'
import { clearDatabase } from '../../../helpers'

describe('GET /api/v1/login', () => {

  beforeEach(co.wrap(function*() {
    let users = [
      { name: 'Foo', password: '123456' }
    , { name: 'Bar', password: '123456' }
    ]

    for (let data of users) {
      let user = new User

      user.name = data.name

      yield user.setPassword(data.password)
      yield user.saveAsync()
    }
  }))

  it('rejects logins without credentials', done => {
    request(app).post('/api/v1/login')
      .expect('Content-Type', /json/)
      .expect({ message: 'Missing credentials', status: 400, error: {} })
      .expect(400, done)
  })

  it('rejects logins with wrong password', done => {
    request(app).post('/api/v1/login')
      .send({ 'username': 'Foo', 'password': 'qwertz' })
      .expect('Content-Type', /json/)
      .expect({ message: 'Invalid login!', status: 400, error: {} })
      .expect(400, done)
  })

  it('rejects logins with wrong username', done => {
    request(app).post('/api/v1/login')
      .send({ 'username': 'Baz', 'password': '123456' })
      .expect('Content-Type', /json/)
      .expect({ message: 'Invalid login!', status: 400, error: {} })
      .expect(400, done)
  })

  it('accepts logins with right credentials', done => {
    request(app).post('/api/v1/login')
      .send({ 'username': 'Foo', 'password': '123456' })
      .expect('Content-Type', /json/)
      .expect('set-cookie', /^connect.sid=.*?; Path=\/;/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        expect(res.body.sessionId).to.be.a('string')
        expect(res.body.userId).to.be.a('string')
        done()
      })
  })
})

describe('GET /api/v1/whoami', () => {

  beforeEach(co.wrap(function*() {
    let users = [
      { name: 'Foo', password: '123456' }
    , { name: 'Bar', password: '123456' }
    ]

    for (let data of users) {
      let user = new User

      user.name = data.name

      yield user.setPassword(data.password)
      yield user.saveAsync()
    }
  }))

  it('needs authentication', done => {
    request(app).get('/api/v1/whoami')
      .expect('Content-Type', /json/)
      .expect(401, done)
  })

  it.skip('responds with the current userId', done => {
    //
  })

  it.skip('responds with the current version', done => {
    //
  })

  it.skip('responds with the users request ip', done => {
    //
  })

})

describe.skip('GET /api/v1/logout', () => {

  it.skip('logout works', done => {
    //
  })

  it.skip('logout removes cookies', done => {
    //
  })

  it.skip('requests after logout are unauthenticated', done => {
    //
  })
})
