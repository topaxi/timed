import co                from 'co'
import request           from 'supertest'
import { expect }        from 'chai'
import app               from '../../../../src/app'
import { Team }          from '../../../../models'
import { clearDatabase } from '../../../helpers'

describe('GET /api/v1/teams', () => {

  beforeEach(co.wrap(function*() {
    let teams = [
      { name: 'Team A' }
    , { name: 'Team B' }
    , { name: 'Team C' }
    ]

    yield Team.createAsync(teams)
  }))

  it('needs authentication', done => {
    request(app).get('/api/v1/teams')
      .expect('Content-Type', /json/)
      .expect({ message: 'Not Authorized', status: 401, error: {} })
      .expect(401, done)
  })

  it('lists all teams', done => {
    request(app).get('/api/v1/teams')
      .set('test-auth', true)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        expect(res.body.teams).to.have.length(3)
        done()
      })
  })
})

describe('GET /api/v1/teams/1', () => {
  beforeEach(co.wrap(function*() {
    let teams = [
      { _id: 'a1'.repeat(12), name: 'Team A' }
    , { _id: 'a2'.repeat(12), name: 'Team B' }
    , { _id: 'a3'.repeat(12), name: 'Team C' }
    ]

    yield Team.createAsync(teams)
  }))

  it('needs authentication', done => {
    request(app).get(`/api/v1/teams/${'a1'.repeat(12)}`)
      .expect('Content-Type', /json/)
      .expect({ message: 'Not Authorized', status: 401, error: {} })
      .expect(401, done)
  })

  it('returns 404 on non-existant record', done => {
    request(app).get(`/api/v1/teams/${'b1'.repeat(12)}`)
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

    request(app).get(`/api/v1/teams/${id}`)
      .set('test-auth', true)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        expect(res.body.team._id,  'id')  .to.equal(id)
        expect(res.body.team.name, 'name').to.equal('Team A')
        done()
      })
  })
})

describe('POST /api/v1/teams', () => {
  it('needs authentication', done => {
    request(app).post('/api/v1/teams')
      .expect('Content-Type', /json/)
      .expect({ message: 'Not Authorized', status: 401, error: {} })
      .expect(401, done)
  })

  it('should create a new team', done => {
    request(app).post('/api/v1/teams')
      .set('test-auth', true)
      .send({ 'team': { name: 'Team D' } })
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        expect(res.body.team._id,  'id')  .to.be.a('string')
        expect(res.body.team.name, 'name').to.equal('Team D')
        done()
      })
  })
})

describe('PUT /api/v1/teams/1', () => {
  beforeEach(co.wrap(function*() {
    let teams = [
      { _id: 'c1'.repeat(12), name: 'Team A' }
    , { _id: 'c2'.repeat(12), name: 'Team C' }
    ]

    yield Team.createAsync(teams)
  }))

  it('needs authentication', done => {
    request(app).put('/api/v1/teams/1')
      .expect('Content-Type', /json/)
      .expect({ message: 'Not Authorized', status: 401, error: {} })
      .expect(401, done)
  })

  it('updates an existing record', done => {
    let id = 'c2'.repeat(12)

    request(app).put(`/api/v1/teams/${id}`)
      .set('test-auth', true)
      .send({ 'team': { name: 'Team B' } })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        expect(res.body.team._id,  'id').to.equal(id)
        expect(res.body.team.name, 'name').to.equal('Team B')
        done()
      })
  })
})

describe('DELETE /api/v1/teams/1', () => {
  beforeEach(co.wrap(function*() {
    let teams = [
      { _id: 'c1'.repeat(12), name: 'Team A' }
    ]

    yield Team.createAsync(teams)
  }))

  it('needs authentication', done => {
    request(app).delete('/api/v1/teams/1')
      .expect('Content-Type', /json/)
      .expect({ message: 'Not Authorized', status: 401, error: {} })
      .expect(401, done)
  })

  it('deletes an existing record', done => {
    let id = 'c1'.repeat(12)

    request(app).delete(`/api/v1/teams/${id}`)
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
