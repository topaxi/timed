var mongoose = require('mongoose')

var Customer = module.exports = mongoose.model('Customer', require('../schemas/customer'))
