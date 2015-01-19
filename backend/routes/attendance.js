var Attendance = require('../models/attendance')
  , auth = require('../middleware/auth')

module.exports = function(app) {
  app.get('/api/v1/attendances', auth, (req, res, next) => {
    if (req.query.from) req.query.from = { '$gte': new Date(+req.query.from) }
    if (req.query.to)   req.query.to   = { '$lte': new Date(+req.query.to)   }

    Attendance.find(req.query, (err, attendances) => {
      if (err) return next(err)

      res.send({ attendances })
    })
  })

  app.get('/api/v1/attendances/:id', auth, (req, res, next) => {
    Attendance.findById(req.params.id, (err, attendance) => {
      if (err) return next(err)

      res.send({ attendances })
    })
  })

  app.post('/api/v1/attendances', auth, (req, res, next) => {
    var attendance = new Attendance(req.body.attendance)

    attendance.save(err => {
      if (err) return next(err)

      res.send({ attendance })
    })
  })

  // todo
  // app.put('/api/v1/attendances', auth, fun...

  app.put('/api/v1/attendances/:id', auth, (req, res, next) => {
    Attendance.findById(req.params.id, (err, attendance) => {
      if (err) return next(err)

      attendance.user       = req.body.attendance.user
      attendance.from       = req.body.attendance.from
      attendance.to         = req.body.attendance.to
      attendance.activities = req.body.attendance.activities

      attendance.save(err => {
        if (err) return next(err)

        res.send({ attendance })
      })
    })
  })

  app.delete('/api/v1/attendances/:id', auth, (req, res, next) => {
    Attendance.findById(req.params.id, (err, attendance) => {
      if (err) return next(err)

      attendance.remove(err => {
        if (err) return next(err)

        return res.send(true)
      })
    })
  })
}
