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

app.server = http.createServer(app)

export { default as io } from './socket'

app.set('version',     version())
app.set('title',       config.title)
app.set('trust proxy', config.trustProxy)
app.set('port',        process.env.PORT || config.port)
app.set('mongodb',     config.mongodb)

let morganConfig = {
  'development': 'dev'
, 'testing':     'tiny'
, 'production':  'combined'
}

app.use(require('morgan')(morganConfig[app.get('env')]))

if (app.get('env') === 'testing') {
  // Remove logger for testing instance
  app._router.stack.pop()
  app.set('mongodb', 'mongodb://127.0.0.1/timed-testing')
}

app.use(bodyParser.json())
app.use(cookieParser(config.cookieSecret))
app.use(session)
app.use(auth)

require('../routes')
