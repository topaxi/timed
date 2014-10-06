var Schema   = require('mongoose').Schema
  , Activity = require('./activity')

var Attendance = module.exports = new Schema({
    'from':       { type: Date, required: true }
  , 'to':         Date
  , 'activities': [ Activity ]
})
