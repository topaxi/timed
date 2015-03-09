import co                from 'co'
import request           from 'supertest'
import { expect }        from 'chai'
import app               from '../../../../src/app'
import { Assignment }    from '../../../../models'
import { clearDatabase } from '../../../helpers'

describe('GET /api/v1/assignments', () => {

  beforeEach(co.wrap(function*() {
    let assignments = [
      { from: new Date, to: new Date, duration: 0, tasks: [] }
    , { from: new Date, to: new Date, duration: 0, tasks: [] }
    , { from: new Date, to: new Date, duration: 0, tasks: [] }
    , { from: new Date, to: new Date, duration: 0, tasks: [] }
    , { from: new Date, to: new Date, duration: 0, tasks: [] }
    , { from: new Date, to: new Date, duration: 0, tasks: [] }
    ]

    yield Assignment.createAsync(assignments)
  }))

  it('needs authentication', done => {
    request(app).get('/api/v1/assignments')
      .expect('Content-Type', /json/)
      .expect(401)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        expect(res.body.status).to.equal(401)
        expect(res.body.message).to.be.a('string')
        done()
      })
  })

  it('lists all assignments', done => {
    request(app).get('/api/v1/assignments')
      .set('test-auth', true)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        expect(res.body.assignments).to.have.length(6)
        done()
      })
  })
})

describe('GET /api/v1/assignments/1', () => {
  beforeEach(co.wrap(function*() {
    let assignments = [
      { _id: 'a1'.repeat(12), from: new Date, to: new Date, duration: 0, tasks: [] }
    , { _id: 'a2'.repeat(12), from: new Date, to: new Date, duration: 0, tasks: [] }
    , { _id: 'a3'.repeat(12), from: new Date, to: new Date, duration: 0, tasks: [] }
    , { _id: 'a4'.repeat(12), from: new Date, to: new Date, duration: 0, tasks: [] }
    , { _id: 'a5'.repeat(12), from: new Date, to: new Date, duration: 0, tasks: [] }
    , { _id: 'a6'.repeat(12), from: new Date, to: new Date, duration: 0, tasks: [] }
    ]

    yield Assignment.createAsync(assignments)
  }))

  it('needs authentication', done => {
    request(app).get(`/api/v1/assignments/${'a1'.repeat(12)}`)
      .expect('Content-Type', /json/)
      .expect(401, done)
  })

  it('returns 404 on non-existant record', done => {
    request(app).get(`/api/v1/assignments/${'b1'.repeat(12)}`)
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

    request(app).get(`/api/v1/assignments/${id}`)
      .set('test-auth', true)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        expect(res.body.assignment._id,      'id')      .to.equal(id)
        expect(res.body.assignment.from,     'from')    .to.be.a('string')
        expect(res.body.assignment.to,       'to')      .to.be.a('string')
        expect(res.body.assignment.project,  'project') .to.not.exist
        expect(res.body.assignment.user,     'user')    .to.not.exist
        expect(res.body.assignment.duration, 'duration').to.be.a('number')
        expect(res.body.assignment.tasks,    'task')    .to.be.a('array')
        expect(res.body.assignment.tasks,    'task')    .to.be.empty
        done()
      })
  })
})

describe('POST /api/v1/assignments', () => {
  it('needs authentication', done => {
    request(app).post('/api/v1/assignments')
      .expect('Content-Type', /json/)
      .expect(401, done)
  })

  it('should create a new assignment', done => {
    request(app).post('/api/v1/assignments')
      .set('test-auth', true)
      .send({ 'assignment': { 'from': (new Date).toJSON(), 'duration': 1000 } })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        expect(res.body.assignment._id,      'id')      .to.be.a('string')
        expect(res.body.assignment.from,     'from')    .to.be.a('string')
        expect(res.body.assignment.to,       'to')      .to.not.exist
        expect(res.body.assignment.project,  'project') .to.not.exist
        expect(res.body.assignment.user,     'user')    .to.not.exist
        expect(res.body.assignment.duration, 'duration').to.be.equal(1000)
        expect(res.body.assignment.tasks,    'task')    .to.be.a('array')
        expect(res.body.assignment.tasks,    'task')    .to.be.empty
        done()
      })
  })
})

describe('PUT /api/v1/assignments/1', () => {
  beforeEach(co.wrap(function*() {
    let assignments = [
      { _id: 'a1'.repeat(12), from: new Date, to: new Date, duration: 0, tasks: [] }
    ]

    yield Assignment.createAsync(assignments)
  }))

  it('needs authentication', done => {
    request(app).put('/api/v1/assignments/1')
      .expect('Content-Type', /json/)
      .expect(401, done)
  })

  it('updates an existing record', done => {
    let id = 'a1'.repeat(12)

    request(app).put(`/api/v1/assignments/${id}`)
      .set('test-auth', true)
      .send({ 'assignment': { 'duration': 1000 } })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        expect(res.body.assignment.duration, 'duration').to.be.equal(1000)
        done()
      })
  })
})

describe('DELETE /api/v1/assignments/1', () => {
  beforeEach(co.wrap(function*() {
    let assignments = [
      { _id: 'a1'.repeat(12), from: new Date, to: new Date, duration: 0, tasks: [] }
    ]

    yield Assignment.createAsync(assignments)
  }))

  it('needs authentication', done => {
    request(app).delete('/api/v1/assignments/1')
      .expect('Content-Type', /json/)
      .expect(401, done)
  })

  it('deletes an existing record', done => {
    let id = 'a1'.repeat(12)

    request(app).delete(`/api/v1/assignments/${id}`)
      .set('test-auth', true)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        expect(res.body).to.be.ok
        done()
      })
  })
})