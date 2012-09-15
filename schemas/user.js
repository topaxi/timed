var Schema     = require('mongoose').Schema
  , Attendance = require('./attendance')

var User = module.exports = new Schema({
    'name':     { type: String, required: true, index: { unique: true } }
  , 'password': String
  , 'quota':    [{ 'from':    Date
                 , 'to':      Date
                 , 'percent': { type: Number, min: 0, max: 100 }
                 }
                ]
  , 'attendances': [ Attendance ]
  , 'projects': [{ type: Schema.Types.ObjectId, ref: 'Project' }]
})
