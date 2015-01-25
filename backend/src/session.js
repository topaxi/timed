import session      from 'express-session'
import connectMongo from 'connect-mongo'
import ShortId      from 'mongoose-shortid'
import config       from '../config.json'

var MongoStore = connectMongo(session)

export default session({
  '_id':               ShortId
, 'secret':            config.cookieSecret
, 'resave':            false
, 'saveUninitialized': true
, 'store':             new MongoStore({ 'url': config.mongodb })
})
