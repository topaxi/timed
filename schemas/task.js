var Schema = require('mongoose').Schema

var Task = module.exports = new Schema

Task.add({ 'name':     String
         , 'duration': Number
         , 'from':     Date
         , 'to':       Date
         , 'tasks':    [ Task ]
         , 'done':     Boolean
         })
