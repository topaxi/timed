import merge from 'lodash/object/merge'

const defaults = {
  title:      'Timed'
, mongodb:    { host: '127.0.0.1', db: 'timed' }
, port:       3000
, trustProxy: 'loopback'
}

const config = merge({}, defaults, require('../config.json'), {
  port:    process.env.PORT
, mongodb: { host: process.env.MONGO_HOST, db: process.env.MONGO_DB }
})

config.mongodb = `mongodb://${config.mongodb.host}/${config.mongodb.db}`

export default Object.freeze(config)
