import express      from 'express'
import bodyParser   from 'body-parser'
import cookieParser from 'cookie-parser'
import http         from 'http'
import version      from 'git-repo-version'
import session      from './session'
import auth         from './auth'
import config       from '../config.json'

let app = express()
export default app

app.set('version',     version())
app.set('title',       config.title)
app.set('trust proxy', config.trustProxy)
app.set('port',        process.env.PORT || config.port)
app.set('mongodb',     config.mongodb)

if (app.get('env') === 'testing') {
  app.set('mongodb', 'mongodb://127.0.0.1/timed-testing')
}
else if (app.get('env') === 'development') {
  app.use(require('morgan')('dev'))
}
else if (app.get('env') === 'production') {
  app.use(require('morgan')('combined'))
}

app.use(bodyParser.json())
app.use(cookieParser(config.cookieSecret))
app.use(session)

app.use(auth)

require('../routes')

app.server = http.createServer(app)
