import request  from 'supertest'
import app      from '../../../../src/app'
import { User } from '../../../../models'

describe('GET /api/v1/login', () => {

  beforeEach(async() => {
    let users = [
      { name: 'Foo', password: '123456' }
    , { name: 'Bar', password: '123456' }
    ]

    for (let data of users) {
      let user = new User

      user.name = data.name

      await user.setPassword(data.password)
      await user.save()
    }
  })

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
  let agent = request.agent(app)
  let userId

  beforeEach(async() => {
    let user = new User({ name: 'Foo' })

    await user.setPassword('123456')
    await user.save()

    userId = user.id

    return new Promise((resolve, reject) =>
      agent.post('/api/v1/login')
        .send({ username: 'Foo', password: '123456' })
        .end((err, res) => {
          if (err) {
            return reject(err)
          }

          resolve()
        })
    )
  })

  it('doesn\'t need authentication', done => {
    request(app).get('/api/v1/whoami')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })

  it('responds with the current userId', done => {
    agent.get('/api/v1/whoami')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        expect(res.body.userId).to.equal(userId)
        done()
      })
  })

  it('responds with the current version', done => {
    agent.get('/api/v1/whoami')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        expect(res.body.version).to.be.a('string')
        done()
      })
  })

  it.skip('responds with the users request ip', done => {
    // Requests supertest don't produce any remote addr...
  })
})

describe('GET /api/v1/logout', () => {
  let agent = request.agent(app)

  beforeEach(async() => {
    let user = new User({ name: 'Foo' })

    await user.setPassword('123456')
    await user.save()

    return new Promise((resolve, reject) =>
      agent.post('/api/v1/login')
        .send({ username: 'Foo', password: '123456' })
        .end((err, res) => {
          if (err) {
            return reject(err)
          }

          resolve()
        })
    )
  })

  it('logout works', done => {
    agent.post('/api/v1/logout')
      .expect('Location', '/')
      .expect(302, done)
  })

  it('logout removes cookies', done => {
    agent.post('/api/v1/logout')
      .expect(302)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        expect(res.headers['set-cookie']).to.be.undefined
        done()
      })
  })

  it('requests after logout are unauthenticated', done => {
    agent.post('/api/v1/logout').end(test)

    function test() {
      agent.get('/api/v1/users')
        .expect('Content-Type', /json/)
        .expect(401, done)
    }
  })
})
