export default function(app) {
  app.use((err, req, res, next) => {
    var status = err.status || 500

    res.status(status)
    res.send({ message: err.message, status, error: true })
  })
}
