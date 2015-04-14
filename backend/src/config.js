import merge from 'lodash/object/merge'

const defaults = {
  title:      'Timed'
, mongodb:    'mongodb://127.0.0.1/timed'
, port:       3000
, trustProxy: 'loopback'
}

const config = merge({}, defaults, require('../config.json'), {
  port:    process.env.PORT
, mongodb: process.env.MONGODB
})

export default Object.freeze(config)
