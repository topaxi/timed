import co                from 'co'
import request           from 'supertest'
import { expect }        from 'chai'
import app               from '../../../../src/app'
import { clearDatabase } from '../../../helpers'
import {
  Project
, Task
, Attendance
, User
} from '../../../../models'

describe('GET /api/v1/tasks', () => {

  beforeEach(co.wrap(function*() {
    let project = new Project({ name: 'Project A' })

    yield project.saveAsync()

    let tasks = [
      { _id: 'a1'.repeat(12), name: 'Task A', project }
    , { _id: 'a2'.repeat(12), name: 'Task B', project }
    , { _id: 'a3'.repeat(12), name: 'Task C', project }
    ]

    yield Task.createAsync(tasks)
  }))

  it('needs authentication', done => {
    request(app).get('/api/v1/tasks')
      .expect('Content-Type', /json/)
      .expect({ message: 'Not Authorized', status: 401, error: {} })
      .expect(401, done)
  })

  it('lists all tasks', done => {
    request(app).get('/api/v1/tasks')
      .set('test-auth', true)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        expect(res.body.tasks).to.have.length(3)
        done()
      })
  })

  it('lists only selected tasks', done => {
    request(app).get('/api/v1/tasks')
      .query({ ids: [ 'a1'.repeat(12), 'a3'.repeat(12) ] })
      .set('test-auth', true)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        expect(res.body.tasks).to.have.length(2)
        done()
      })
  })
})

describe('GET /api/v1/tasks/1', () => {
  beforeEach(co.wrap(function*() {
    let project = new Project({ name: 'Project A' })

    yield project.saveAsync()

    let tasks = [
      { _id: 'a1'.repeat(12), name: 'Task A', project }
    , { _id: 'a2'.repeat(12), name: 'Task B', project }
    , { _id: 'a3'.repeat(12), name: 'Task C', project }
    ]

    yield Task.createAsync(tasks)
  }))

  it('needs authentication', done => {
    request(app).get(`/api/v1/tasks/${'a1'.repeat(12)}`)
      .expect('Content-Type', /json/)
      .expect({ message: 'Not Authorized', status: 401, error: {} })
      .expect(401, done)
  })

  it('returns 404 on non-existant record', done => {
    request(app).get(`/api/v1/tasks/${'b1'.repeat(12)}`)
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

    request(app).get(`/api/v1/tasks/${id}`)
      .set('test-auth', true)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        expect(res.body.task._id,  'id')  .to.equal(id)
        expect(res.body.task.name, 'name').to.equal('Task A')
        done()
      })
  })
})

describe('GET /api/v1/tasks/1/progress', () => {
  let taskId

  beforeEach(co.wrap(function*() {
    let project = new Project({ name: 'Project A' })
    let user    = new User({ name: 'User A' })

    yield [ project.saveAsync(), user.saveAsync() ]

    let task = new Task({ _id: 'a1'.repeat(12), name: 'Task A', project, duration: 100 })

    taskId = task.id

    yield task.saveAsync()

    let from = Date.now()
    let to   = Date.now() + 20

    let attendances = [
      { _id: 'b1'.repeat(12), user, from, to, activities: [ { from, to, task } ] }
    , { _id: 'b2'.repeat(12), user, from, to, activities: [ { from, to, task } ] }
    , { _id: 'b3'.repeat(12), user, from, to, activities: [ { from, to, task }, { from, to, task } ] }
    ]

    yield Attendance.createAsync(attendances)
  }))

  it('needs authentication', done => {
    request(app).get(`/api/v1/tasks/${taskId}/progress`)
      .expect('Content-Type', /json/)
      .expect({ message: 'Not Authorized', status: 401, error: {} })
      .expect(401, done)
  })

  it('gets task progress', done => {
    request(app).get(`/api/v1/tasks/${taskId}/progress`)
      .set('test-auth', true)
      .expect('Content-Type', /json/)
      .expect({ progress: 80 })
      .expect(200, done)
  })
})

describe('POST /api/v1/tasks', () => {
  let projectId

  beforeEach(co.wrap(function*() {
    let project = new Project({ name: 'Project A' })

    yield project.saveAsync()

    projectId = project.id
  }))

  it('needs authentication', done => {
    request(app).post('/api/v1/tasks')
      .expect('Content-Type', /json/)
      .expect({ message: 'Not Authorized', status: 401, error: {} })
      .expect(401, done)
  })

  it('should create a new task', done => {
    request(app).post('/api/v1/tasks')
      .set('test-auth', true)
      .send({ 'task': { name: 'Task D', project: projectId } })
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        expect(res.body.task._id,     'id')     .to.be.a('string')
        expect(res.body.task.name,    'name')   .to.equal('Task D')
        expect(res.body.task.project, 'project').to.equal(projectId)
        done()
      })
  })
})

describe('PUT /api/v1/tasks/1', () => {
  let projectId

  beforeEach(co.wrap(function*() {
    let project = new Project({ name: 'Project A' })

    yield project.saveAsync()

    projectId = project.id

    let tasks = [
      { _id: 'a1'.repeat(12), name: 'Task A', project }
    , { _id: 'a2'.repeat(12), name: 'Task B', project }
    , { _id: 'a3'.repeat(12), name: 'Task C', project }
    , { _id: 'a4'.repeat(12), name: 'Task E', project }
    ]

    yield Task.createAsync(tasks)
  }))

  it('needs authentication', done => {
    request(app).put('/api/v1/tasks/1')
      .expect('Content-Type', /json/)
      .expect({ message: 'Not Authorized', status: 401, error: {} })
      .expect(401, done)
  })

  it('updates an existing record', done => {
    let id = 'a4'.repeat(12)

    request(app).put(`/api/v1/tasks/${id}`)
      .set('test-auth', true)
      .send({ 'task': { name: 'Task D', project: projectId } })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        expect(res.body.task._id,     'id')     .to.equal(id)
        expect(res.body.task.name,    'name')   .to.equal('Task D')
        expect(res.body.task.project, 'project').to.equal(projectId)
        done()
      })
  })
})

describe('DELETE /api/v1/tasks/1', () => {
  beforeEach(co.wrap(function*() {
    let project = new Project({ name: 'Project A' })

    yield project.saveAsync()

    let tasks = [
      { _id: 'a1'.repeat(12), name: 'Task A', project }
    , { _id: 'a2'.repeat(12), name: 'Task B', project }
    , { _id: 'a3'.repeat(12), name: 'Task C', project }
    ]

    yield Task.createAsync(tasks)
  }))

  it('needs authentication', done => {
    request(app).delete('/api/v1/tasks/1')
      .expect('Content-Type', /json/)
      .expect({ message: 'Not Authorized', status: 401, error: {} })
      .expect(401, done)
  })

  it('deletes an existing record', done => {
    let id = 'a1'.repeat(12)

    request(app).delete(`/api/v1/tasks/${id}`)
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
