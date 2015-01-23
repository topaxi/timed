import session      from 'express-session'
import connectMongo from 'connect-mongo'
import config       from '../config.json'

export default function(app) {
  var MongoStore = connectMongo(session)

  app.use(session({ 'secret':            config.cookieSecret
                  , 'resave':            false
                  , 'saveUninitialized': true
                  , 'store':             new MongoStore({ 'url': config.mongodb })
                  }))
}
