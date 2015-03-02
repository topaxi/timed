import express      from 'express'
import bodyParser   from 'body-parser'
import cookieParser from 'cookie-parser'
import version      from 'git-repo-version'
import http         from 'http'
import session      from './session'
import auth         from './auth'
import config       from '../config.json'

let app = express()
export default app

app.set('version',     version())
app.set('title',       config.title ? `Timed - ${config.title}` : 'Timed')
app.set('trust proxy', config.trustProxy)
app.set('port',        process.env.PORT || config.port || 3000)

app.use(require('morgan')('dev'))
app.use(bodyParser.json())
app.use(cookieParser(config.cookieSecret))
app.use(session)
app.use(auth)

require('../routes')

http.createServer(app).listen(app.get('port'), () =>
  console.log('Timed server version %s listening on port %d'
  , app.get('version')
  , app.get('port')
  )
)
