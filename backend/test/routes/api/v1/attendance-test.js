import request        from 'supertest'
import app            from '../../../../src/app'
import { Attendance } from '../../../../models'

describe('GET /api/v1/attendances', () => {
  let base  = new Date('2015-03-06T12:10:27.312Z')
  let date2 = new Date(+base  + 1000 * 60 * 60)
  let date3 = new Date(+date2 + 1000 * 60 * 60)
  let date4 = new Date(+date3 + 1000 * 60 * 60)

  beforeEach(async() => {
    let attendances = [
      { from: base,  to: date2, user: 'u1'.repeat(12), activities: [] }
    , { from: base,  to: date2, user: 'u1'.repeat(12), activities: [] }
    , { from: date2, to: date3, user: 'u2'.repeat(12), activities: [] }
    , { from: date2, to: date3, user: 'u2'.repeat(12), activities: [] }
    , { from: date2, to: date3, user: 'u3'.repeat(12), activities: [] }
    , { from: date3, to: date4, user: 'u3'.repeat(12), activities: [] }
    ]

    await Attendance.create(attendances)
  })

  it('needs authentication', done => {
    request(app).get('/api/v1/attendances')
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

  it('lists all attendances', done => {
    request(app).get('/api/v1/attendances')
      .set('test-auth', true)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        expect(res.body.attendances).to.have.length(6)
        done()
      })
  })

  it('filters by "from" and "to" query params', done => {
    request(app).get('/api/v1/attendances')
      .query({ from: date2.getTime(), to: date3.getTime() })
      .set('test-auth', true)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        expect(res.body.attendances).to.have.length(3)
        done()
      })
  })
})

describe('GET /api/v1/attendances/1', () => {
  beforeEach(async() => {
    let attendances = [
      { _id: 'a1'.repeat(12), from: new Date, to: new Date, user: 'u1'.repeat(12), activities: [] }
    , { _id: 'a2'.repeat(12), from: new Date, to: new Date, user: 'u1'.repeat(12), activities: [] }
    , { _id: 'a3'.repeat(12), from: new Date, to: new Date, user: 'u2'.repeat(12), activities: [] }
    , { _id: 'a4'.repeat(12), from: new Date, to: new Date, user: 'u2'.repeat(12), activities: [] }
    , { _id: 'a5'.repeat(12), from: new Date, to: new Date, user: 'u3'.repeat(12), activities: [] }
    , { _id: 'a6'.repeat(12), from: new Date, to: new Date, user: 'u3'.repeat(12), activities: [] }
    ]

    await Attendance.create(attendances)
  })

  it('needs authentication', done => {
    request(app).get(`/api/v1/attendances/${'a1'.repeat(12)}`)
      .expect('Content-Type', /json/)
      .expect(401, done)
  })

  it('returns 404 on non-existant record', done => {
    request(app).get(`/api/v1/attendances/${'b1'.repeat(12)}`)
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

    request(app).get(`/api/v1/attendances/${id}`)
      .set('test-auth', true)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        expect(res.body.attendance._id,        'id')        .to.equal(id)
        expect(res.body.attendance.from,       'from')      .to.be.a('string')
        expect(res.body.attendance.to,         'to')        .to.be.a('string')
        expect(res.body.attendance.user,       'user')      .to.be.a('string')
        expect(res.body.attendance.activities, 'activities').to.be.a('array')
        expect(res.body.attendance.activities, 'activities').to.be.empty
        done()
      })
  })
})

describe('POST /api/v1/attendances', () => {
  it('needs authentication', done => {
    request(app).post('/api/v1/attendances')
      .expect('Content-Type', /json/)
      .expect(401, done)
  })

  it('should create a new attendance', done => {
    let user = 'u1'.repeat(12)

    request(app).post('/api/v1/attendances')
      .set('test-auth', true)
      .send({ 'attendance': { 'from': (new Date).toJSON(), user } })
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        expect(res.body.attendance._id,        'id')  .to.be.a('string')
        expect(res.body.attendance.from,       'from').to.be.a('string')
        expect(res.body.attendance.to,         'to')  .to.not.exist
        expect(res.body.attendance.user,       'user').to.be.a('string')
        expect(res.body.attendance.activities, 'task').to.be.a('array')
        expect(res.body.attendance.activities, 'task').to.be.empty
        done()
      })
  })
})

describe('PUT /api/v1/attendances/1', () => {
  beforeEach(async() => {
    let attendances = [
      { _id: 'a1'.repeat(12), from: new Date, to: new Date, user: 'u1'.repeat(12), activties: [] }
    , { _id: 'a2'.repeat(12), from: new Date, to: new Date, user: 'u1'.repeat(12), activties: [] }
    ]

    await Attendance.create(attendances)
  })

  it('needs authentication', done => {
    request(app).put('/api/v1/attendances/1')
      .expect('Content-Type', /json/)
      .expect(401, done)
  })

  it('updates an existing record', done => {
    let id = 'a2'.repeat(12)
    let to = new Date

    request(app).put(`/api/v1/attendances/${id}`)
      .set('test-auth', true)
      .send({ 'attendance': { to } })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        expect(res.body.attendance._id, 'id').to.be.equal(id)
        expect(res.body.attendance.to,  'to').to.be.equal(to.toJSON())
        done()
      })
  })
})

describe('DELETE /api/v1/attendances/1', () => {
  beforeEach(async() => {
    let attendances = [
      { _id: 'a1'.repeat(12), from: new Date, to: new Date, user: 'u1'.repeat(12), activties: [] }
    ]

    await Attendance.create(attendances)
  })

  it('needs authentication', done => {
    request(app).delete('/api/v1/attendances/1')
      .expect('Content-Type', /json/)
      .expect(401, done)
  })

  it('deletes an existing record', done => {
    let id = 'a1'.repeat(12)

    request(app).delete(`/api/v1/attendances/${id}`)
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
