import socketio from 'socket.io'
import redis    from 'socket.io-redis'
import config   from './config'
import session  from './session'

import app, {
  server
} from './app'

const io = socketio(server)
export default io

io.adapter(redis(config.redis))

io.use((socket, next) => {
  session(socket.request, socket, next)
})

/* istanbul ignore next */
io.on('connection', socket => {
  if (!socket.request.session.passport) {
    return socket.disconnect()
  }

  socket.emit('backend version', app.get('version'))
})

app.use((req, res, next) => {
  let socketId = req.headers['x-timed-current-socket']

  res.push = (event, data) => {
    io.emit(event, socketId, data)
    res.send(data)
  }

  res.pushModel = data => res.push('model', data)

  res.unloadModel = (type, id) => {
    io.emit('unload model', socketId, type, id)
    res.status(204)
    res.send()
  }

  next()
})
