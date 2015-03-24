import socketio from 'socket.io'
import app      from './app'

const io = socketio(app.server)
export default io

app.use((req, res, next) => {
  let socketId = req.headers['x-timed-current-socket']

  res.push = (event, data) => {
    emitExcept(socketId, event, data)
    res.send(data)
  }

  res.pushModel = data => res.push('model', data)

  res.unloadModel = (type, id) => {
    emitExcept(socketId, 'unload model', type, id)
    res.status(204)
    res.send()
  }

  next()
})

function emitExcept(id, ...data) {
  let ids = Object.keys(io.engine.clients).filter(i => i !== id)

  for (let clientId of ids) {
    io.to(clientId).emit(...data)
  }
}
