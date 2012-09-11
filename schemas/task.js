var Schema = require('mongoose').Schema

var Task = module.exports = new Schema

Task.add({ 'duration': Number
         , 'from':     Date,
         , 'to':       Date
         , 'tasks':    [ Task ]
         })
