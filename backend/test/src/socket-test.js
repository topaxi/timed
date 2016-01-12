import io from 'socket.io-client'

import {
  server
} from '../../src/app'

let options = {
  transports: [ 'websocket' ]
, 'force new connection': true
}

const TEST_PORT = 5555

describe('Socket.io', () => {

  beforeEach(done =>
    server.listen(TEST_PORT, done)
  )

  afterEach(done => {
    server.close()
    done()
  })

  it('can connect', done => {
    let client = io.connect(`http://localhost:${TEST_PORT}`, options)

    client.once('connect', done)
  })

})
