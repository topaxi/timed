import co                from 'co'
import request           from 'supertest'
import { expect }        from 'chai'
import app               from '../../../../src/app'
import { Project }       from '../../../../models'
import { clearDatabase } from '../../../helpers'

describe('GET /api/v1/projects', () => {

  beforeEach(co.wrap(function*() {
    let projects = [
      { name: 'Project A' }
    , { name: 'Project B' }
    , { name: 'Project C' }
    ]

    yield Project.createAsync(projects)
  }))

  it('needs authentication', done => {
    request(app).get('/api/v1/projects')
      .expect('Content-Type', /json/)
      .expect({ message: 'Not authenticated!', status: 401, error: {} })
      .expect(401, done)
  })

  it('lists all projects', done => {
    request(app).get('/api/v1/projects')
      .set('test-auth', true)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        expect(res.body.projects).to.have.length(3)
        done()
      })
  })
})

describe('GET /api/v1/projects/1', () => {
  beforeEach(co.wrap(function*() {
    let projects = [
      { _id: 'a1'.repeat(12), name: 'Project A' }
    , { _id: 'a2'.repeat(12), name: 'Project B' }
    , { _id: 'a3'.repeat(12), name: 'Project C' }
    ]

    yield Project.createAsync(projects)
  }))

  it('needs authentication', done => {
    request(app).get(`/api/v1/projects/${'a1'.repeat(12)}`)
      .expect('Content-Type', /json/)
      .expect({ message: 'Not authenticated!', status: 401, error: {} })
      .expect(401, done)
  })

  it('returns 404 on non-existant record', done => {
    request(app).get(`/api/v1/projects/${'b1'.repeat(12)}`)
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

    request(app).get(`/api/v1/projects/${id}`)
      .set('test-auth', true)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        expect(res.body.project._id,  'id')  .to.equal(id)
        expect(res.body.project.name, 'name').to.equal('Project A')
        done()
      })
  })
})

describe('POST /api/v1/projects', () => {
  it('needs authentication', done => {
    request(app).post('/api/v1/projects')
      .expect('Content-Type', /json/)
      .expect({ message: 'Not authenticated!', status: 401, error: {} })
      .expect(401, done)
  })

  it('should create a new project', done => {
    request(app).post('/api/v1/projects')
      .set('test-auth', true)
      .send({ 'project': { name: 'Project D' } })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        expect(res.body.project._id,  'id')  .to.be.a('string')
        expect(res.body.project.name, 'name').to.equal('Project D')
        done()
      })
  })
})

describe('PUT /api/v1/projects/1', () => {
  beforeEach(co.wrap(function*() {
    let projects = [
      { _id: 'c1'.repeat(12), name: 'Project A' }
    ]

    yield Project.createAsync(projects)
  }))

  it('needs authentication', done => {
    request(app).put('/api/v1/projects/1')
      .expect('Content-Type', /json/)
      .expect({ message: 'Not authenticated!', status: 401, error: {} })
      .expect(401, done)
  })

  it('updates an existing record', done => {
    let id = 'c1'.repeat(12)

    request(app).put(`/api/v1/projects/${id}`)
      .set('test-auth', true)
      .send({ 'project': { name: 'Project B' } })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        expect(res.body.project.name, 'name').to.equal('Project B')
        done()
      })
  })
})

describe('DELETE /api/v1/projects/1', () => {
  beforeEach(co.wrap(function*() {
    let projects = [
      { _id: 'c1'.repeat(12), name: 'Project A' }
    ]

    yield Project.createAsync(projects)
  }))

  it('needs authentication', done => {
    request(app).delete('/api/v1/projects/1')
      .expect('Content-Type', /json/)
      .expect({ message: 'Not authenticated!', status: 401, error: {} })
      .expect(401, done)
  })

  it('deletes an existing record', done => {
    let id = 'c1'.repeat(12)

    request(app).delete(`/api/v1/projects/${id}`)
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
