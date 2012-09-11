var mongoose = require('mongoose')

var User = module.exports = mongoose.model('User', require('../schemas/user'))
