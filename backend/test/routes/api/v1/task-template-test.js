import request    from 'supertest'
import app        from '../../../../src/app'
import { TaskTemplate } from '../../../../models'

describe('GET /api/v1/task-templates', () => {

  beforeEach(async() => {
    let taskTemplate = new TaskTemplate({ name: 'Template A' })

    await taskTemplate.save()
  })

  it('needs authentication', done => {
    request(app).get('/api/v1/task-templates')
      .expect('Content-Type', /json/)
      .expect({ message: 'Not Authorized', status: 401, error: {} })
      .expect(401, done)
  })

  it('lists all task templates', done => {
    request(app).get('/api/v1/task-templates')
      .set('test-auth', true)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        expect(res.body['task-templates']).to.have.length(1)
        done()
      })
  })
})
