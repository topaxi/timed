import co                from 'co'
import request           from 'supertest'
import { expect }        from 'chai'
import app               from '../../../../src/app'
import { Customer }      from '../../../../models'
import { clearDatabase } from '../../../helpers'

describe('GET /api/v1/customers', () => {

  beforeEach(co.wrap(function*() {
    let customers = [
      { name: 'Company A' }
    , { name: 'Company B' }
    , { name: 'Company C' }
    ]

    yield Customer.createAsync(customers)
  }))

  it('needs authentication', done => {
    request(app).get('/api/v1/customers')
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

  it('lists all customers', done => {
    request(app).get('/api/v1/customers')
      .set('test-auth', true)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        expect(res.body.customers).to.have.length(3)
        done()
      })
  })
})

describe('GET /api/v1/customers/1', () => {
  beforeEach(co.wrap(function*() {
    let customers = [
      { _id: 'c1'.repeat(12), name: 'Company A' }
    , { _id: 'c2'.repeat(12), name: 'Company B' }
    , { _id: 'c3'.repeat(12), name: 'Company C' }
    ]

    yield Customer.createAsync(customers)
  }))

  it('needs authentication', done => {
    request(app).get(`/api/v1/customers/${'c1'.repeat(12)}`)
      .expect('Content-Type', /json/)
      .expect(401, done)
  })

  it('returns 404 on non-existant record', done => {
    request(app).get(`/api/v1/customers/${'b1'.repeat(12)}`)
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
    let id = 'c1'.repeat(12)

    request(app).get(`/api/v1/customers/${id}`)
      .set('test-auth', true)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        expect(res.body.customer._id,  'id')  .to.equal(id)
        expect(res.body.customer.name, 'name').to.equal('Company A')
        done()
      })
  })
})

describe('POST /api/v1/customers', () => {
  it('needs authentication', done => {
    request(app).post('/api/v1/customers')
      .expect('Content-Type', /json/)
      .expect(401, done)
  })

  it('should create a new customer', done => {
    request(app).post('/api/v1/customers')
      .set('test-auth', true)
      .send({ 'customer': { name: 'Customer D' } })
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        expect(res.body.customer._id,  'id')  .to.be.a('string')
        expect(res.body.customer.name, 'name').to.equal('Customer D')
        done()
      })
  })
})

describe('PUT /api/v1/customers/1', () => {
  beforeEach(co.wrap(function*() {
    let customers = [
      { _id: 'c1'.repeat(12), name: 'Company A' }
    , { _id: 'c2'.repeat(12), name: 'Company C' }
    ]

    yield Customer.createAsync(customers)
  }))

  it('needs authentication', done => {
    request(app).put('/api/v1/customers/1')
      .expect('Content-Type', /json/)
      .expect(401, done)
  })

  it('updates an existing record', done => {
    let id = 'c2'.repeat(12)

    request(app).put(`/api/v1/customers/${id}`)
      .set('test-auth', true)
      .send({ 'customer': { name: 'Customer B' } })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        expect(res.body.customer._id,  'id').to.equal(id)
        expect(res.body.customer.name, 'name').to.equal('Customer B')
        done()
      })
  })
})

describe('DELETE /api/v1/customers/1', () => {
  beforeEach(co.wrap(function*() {
    let customers = [
      { _id: 'c1'.repeat(12), name: 'Company A' }
    ]

    yield Customer.createAsync(customers)
  }))

  it('needs authentication', done => {
    request(app).delete('/api/v1/customers/1')
      .expect('Content-Type', /json/)
      .expect(401, done)
  })

  it('deletes an existing record', done => {
    let id = 'c1'.repeat(12)

    request(app).delete(`/api/v1/customers/${id}`)
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
