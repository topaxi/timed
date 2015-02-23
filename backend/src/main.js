import express      from 'express'
import bodyParser   from 'body-parser'
import cookieParser from 'cookie-parser'
import http         from 'http'
import mongoose     from 'mongoose'
import config       from '../config.json'

mongoose.connect(config.mongodb)

var app = express()
export default app

app.set('title',       config.title ? `Timed - ${config.title}` : 'Timed')
app.set('trust proxy', config.trustProxy)
app.set('port',        process.env.PORT || config.port || 3000)

app.use(require('morgan')('dev'))
app.use(bodyParser.json())
app.use(cookieParser(config.cookieSecret))
app.use(require('./session'))
app.use(require('./auth'))

require('../routes')(app)

http.createServer(app).listen(app.get('port'), () =>
  console.log('Express server listening on port %d', app.get('port'))
)
