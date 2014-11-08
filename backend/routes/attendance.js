var Attendance = require('../models/attendance')
  , auth = require('../middleware/auth')

module.exports = function(app) {
  app.get('/api/v1/attendances', auth, function(req, res, next) {
    Attendance.find(req.query, function(err, attendances) {
      if (err) return next(err)

      res.send({ attendances: attendances })
    })
  })

  app.get('/api/v1/attendances/:id', auth, function(req, res, next) {
    Attendance.findById(req.params.id, function(err, attendance) {
      if (err) return next(err)

      res.send({ attendances: attendances })
    })
  })

  app.post('/api/v1/attendances', auth, function(req, res, next) {
    var attendance = new Attendance(req.body.attendance)

    attendance.save(function(err) {
      if (err) return next(err)

      res.send({ attendance: attendance })
    })
  })

  // todo
  // app.put('/api/v1/attendances', auth, fun...

  app.put('/api/v1/attendances/:id', auth, function(req, res, next) {
    Attendance.findById(req.params.id, function(err, attendance) {
      if (err) return next(err)

      attendance.user       = req.body.attendance.user
      attendance.from       = req.body.attendance.from
      attendance.to         = req.body.attendance.to
      attendance.activities = req.body.attendance.activities

      attendance.save(function(err) {
        if (err) return next(err)

        res.send({ attendance: attendance })
      })
    })
  })

  app.delete('/api/v1/attendances/:id', auth, function(req, res, next) {
    Attendance.findById(req.params.id, function(err, attendance) {
      if (err) return next(err)

      attendance.remove(function(err) {
        if (err) return next(err)

        return res.send(true)
      })
    })
  })
}
