import app     from '../../../../src/app'
import request from 'supertest'

describe('GET /api/v1/assignments', () => {
  it('needs authentication', done => {
    request(app).get('/api/v1/assignments')
      .expect(401, done)
  })
})

describe('GET /api/v1/assignments/1', () => {
  it('needs authentication', done => {
    request(app).get('/api/v1/assignments/1')
      .expect(401, done)
  })
})

describe('POST /api/v1/assignments', () => {
  it('needs authentication', done => {
    request(app).post('/api/v1/assignments')
      .expect(401, done)
  })
})

describe('PUT /api/v1/assignments/1', () => {
  it('needs authentication', done => {
    request(app).put('/api/v1/assignments/1')
      .expect(401, done)
  })
})

describe('DELETE /api/v1/assignments/1', () => {
  it('needs authentication', done => {
    request(app).delete('/api/v1/assignments/1')
      .expect(401, done)
  })
})
