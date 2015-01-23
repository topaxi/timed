export default function(app) {
  app.use('/api/v1', require('./api/v1')(app))
  app.use(require('./error'))
}
