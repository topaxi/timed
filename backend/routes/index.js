module.exports = function(app) {
  app.use('/api/v1', require('./api/v1')(app))
}
