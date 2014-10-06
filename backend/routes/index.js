var async    = require('async')
  , Task     = require('../models/task')
  , Project  = require('../models/project')
  , Customer = require('../models/customer')

module.exports = function(app) {
  app.get('/', require('../middleware/auth.js'), function(req, res, next) {
    fetchData(function(err, data) {
      if (err) return next(err)

      res.render('index', data)
    })
  })

  app.get('/about', function(req, res) {
    res.render('about')
  })
}

function fetchData(cb) {
  async.parallel({
    'tasks': function(cb) {
      Task.find({}, cb)
    }
  , 'projects': function(cb) {
      Project.find({}, cb)
    }
  , 'customers': function(cb) {
      Customer.find({}, cb)
    }
  }, cb)
}
