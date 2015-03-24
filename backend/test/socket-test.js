import io  from 'socket.io-client'
import app from '../src/app'

let options = {
  transports: [ 'websocket' ]
, 'force new connection': true
}

const TEST_PORT = 5555

describe('Socket.io', () => {

  beforeEach(done =>
    app.server.listen(TEST_PORT, done)
  )

  afterEach(done => {
    app.server.close()
    done()
  })

  it('Runs', done => {
    let client = io.connect(`http://localhost:${TEST_PORT}`, options)

    client.once('connect', done)
  })

})
