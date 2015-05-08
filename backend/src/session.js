import session      from 'express-session'
import connectRedis from 'connect-redis'
import config       from './config'

let { host, port } = config.redis
let Store          = connectRedis(session)

export default session({
  'secret':            config.cookieSecret
, 'resave':            false
, 'saveUninitialized': true
, 'store':             new Store({ host, port })
})
