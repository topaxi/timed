var Router = require('express').Router

module.exports = function(app) {
  var router = new Router

  router.use('/projects',    require('./project')(app))
  router.use('/tasks',       require('./task')(app))
  router.use('/customers',   require('./customer')(app))
  router.use('/teams',       require('./team')(app))
  router.use('/assignments', require('./assignment')(app))
  router.use('/attendances', require('./attendance')(app))
  router.use('/users',       require('./user')(app))
  router.use('/',            require('./login')(app))

  return router
}
