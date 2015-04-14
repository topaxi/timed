import express      from 'express'
import bodyParser   from 'body-parser'
import http         from 'http'
import version      from 'git-repo-version'
import auth         from './auth'
import session      from './session'
import config       from './config'

let app = express()

app.server = http.createServer(app)

export default app
export { default as io } from './socket'

app.set('version',     version())
app.set('title',       config.title)
app.set('trust proxy', config.trustProxy)
app.set('port',        config.port)
app.set('mongodb',     config.mongodb)

/* istanbul ignore if */
if (app.get('env') !== 'testing') {
  let format = app.get('env') === 'development' ? 'dev' : 'combined'

  app.use(require('morgan')(format))
}

app.use(bodyParser.json())
app.use(session)
app.use(auth)

require('../routes')
