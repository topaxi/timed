import co                from 'co'
import request           from 'supertest'
import { expect }        from 'chai'
import { User }          from '../../../../models'
import app               from '../../../../src/app'
import { clearDatabase } from '../../../helpers'

describe('GET /api/v1/init/payload', () => {
  let agent = request.agent(app)

  beforeEach(co.wrap(function*() {
    let users = [
      { name: 'Foo', password: '123456' }
    , { name: 'Bar', password: '123456' }
    ]

    for (let data of users) {
      let user = new User

      user.name = data.name

      yield user.setPassword(data.password)
      yield user.save()
    }
  }))

  it('needs authentication', done => {
    request(app).get('/api/v1/init/payload')
      .expect('Content-Type', /json/)
      .expect(401)
      .end((err, res) => {
        if (err) return done(err)

        expect(res.body.status).to.equal(401)
        expect(res.body.message).to.be.a('string')
        done()
      })
  })

  it('needs valid logged in user', done => {
    request(app).get('/api/v1/init/payload')
      .set('test-auth', true)
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)

        expect(res.body.status).to.equal(400)
        expect(res.body.message).to.be.a('string')
        done()
      })
  })

  it('returns the initial payload', done => {
    let loggedIn = new Promise((resolve, reject) => {
      agent.post('/api/v1/login')
        .send({ username: 'Foo', password: '123456' })
        .end((err, res) => {
          if (err) reject(err)
          resolve(res)
        })
    })

    loggedIn.then(() => {
      agent.get('/api/v1/init/payload')
        .end((err, res) => {
          if (err) done(err)

          expect(res.body.customers)  .to.be.a('array')
          expect(res.body.projects)   .to.be.a('array')
          expect(res.body.tasks)      .to.be.a('array')
          expect(res.body.attendances).to.be.a('array')
          done()
        })
    })
  })
})
