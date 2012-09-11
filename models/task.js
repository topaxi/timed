var mongoose = require('mongoose')

var Task = module.exports = mongoose.model('Task', require('../schemas/task'))
