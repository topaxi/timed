import co                from 'co'
import request           from 'supertest'
import { expect }        from 'chai'
import app               from '../../../../src/app'
import { User }          from '../../../../models'
import { clearDatabase } from '../../../helpers'

describe('GET /api/v1/users', () => {

  beforeEach(co.wrap(function*() {
    let users = [
      { name: 'User A' }
    , { name: 'User B' }
    , { name: 'User C' }
    ]

    yield User.createAsync(users)
  }))

  it('needs authentication', done => {
    request(app).get('/api/v1/users')
      .expect('Content-Type', /json/)
      .expect({ message: 'Not Authorized', status: 401, error: {} })
      .expect(401, done)
  })

  it('lists all users', done => {
    request(app).get('/api/v1/users')
      .set('test-auth', true)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        expect(res.body.users).to.have.length(3)
        done()
      })
  })
})

describe('GET /api/v1/users/1', () => {
  beforeEach(co.wrap(function*() {
    let users = [
      { _id: 'a1'.repeat(12), name: 'User A' }
    , { _id: 'a2'.repeat(12), name: 'User B' }
    , { _id: 'a3'.repeat(12), name: 'User C' }
    ]

    yield User.createAsync(users)
  }))

  it('needs authentication', done => {
    request(app).get(`/api/v1/users/${'a1'.repeat(12)}`)
      .expect('Content-Type', /json/)
      .expect({ message: 'Not Authorized', status: 401, error: {} })
      .expect(401, done)
  })

  it('returns 404 on non-existant record', done => {
    request(app).get(`/api/v1/users/${'b1'.repeat(12)}`)
      .set('test-auth', true)
      .expect('Content-Type', /json/)
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        expect(res.body.status).to.equal(404)
        expect(res.body.message).to.be.a('string')
        done()
      })
  })

  it('gets a single record', done => {
    let id = 'a1'.repeat(12)

    request(app).get(`/api/v1/users/${id}`)
      .set('test-auth', true)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        expect(res.body.user._id,  'id')  .to.equal(id)
        expect(res.body.user.name, 'name').to.equal('User A')
        done()
      })
  })
})

describe('POST /api/v1/users', () => {
  it('needs authentication', done => {
    request(app).post('/api/v1/users')
      .expect('Content-Type', /json/)
      .expect({ message: 'Not Authorized', status: 401, error: {} })
      .expect(401, done)
  })

  it('should create a new user', done => {
    request(app).post('/api/v1/users')
      .set('test-auth', true)
      .send({ 'user': { name: 'User D' } })
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        expect(res.body.user._id,  'id')  .to.be.a('string')
        expect(res.body.user.name, 'name').to.equal('User D')
        done()
      })
  })
})

describe('PUT /api/v1/users/1', () => {
  beforeEach(co.wrap(function*() {
    let users = [
      { _id: 'c1'.repeat(12), name: 'User A' }
    , { _id: 'c2'.repeat(12), name: 'User C' }
    ]

    yield User.createAsync(users)
  }))

  it('needs authentication', done => {
    request(app).put('/api/v1/users/1')
      .expect('Content-Type', /json/)
      .expect({ message: 'Not Authorized', status: 401, error: {} })
      .expect(401, done)
  })

  it('updates an existing record', done => {
    let id = 'c2'.repeat(12)

    request(app).put(`/api/v1/users/${id}`)
      .set('test-auth', true)
      .send({ 'user': { name: 'User B' } })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        expect(res.body.user._id,  'id').to.equal(id)
        expect(res.body.user.name, 'name').to.equal('User B')
        done()
      })
  })
})

describe('DELETE /api/v1/users/1', () => {
  beforeEach(co.wrap(function*() {
    let users = [
      { _id: 'c1'.repeat(12), name: 'User A' }
    ]

    yield User.createAsync(users)
  }))

  it('needs authentication', done => {
    request(app).delete('/api/v1/users/1')
      .expect('Content-Type', /json/)
      .expect({ message: 'Not Authorized', status: 401, error: {} })
      .expect(401, done)
  })

  it('deletes an existing record', done => {
    let id = 'c1'.repeat(12)

    request(app).delete(`/api/v1/users/${id}`)
      .set('test-auth', true)
      .expect(204)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        expect(res.body).to.be.ok
        done()
      })
  })
})
