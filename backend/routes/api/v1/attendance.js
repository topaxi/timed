import { Router } from 'express'
import Attendance from '../../../models/attendance'
import auth       from '../../../middleware/auth'

var router = new Router
export default router

router.use(auth)

router.get('/', (req, res, next) => {
  if (req.query.from) req.query.from = { '$gte': new Date(+req.query.from) }
  if (req.query.to)   req.query.to   = { '$lte': new Date(+req.query.to)   }

  Attendance.find(req.query, (err, attendances) => {
    if (err) return next(err)

    res.send({ attendances })
  })
})

router.post('/', (req, res, next) => {
  var attendance = new Attendance(req.body.attendance)

  attendance.save(err => {
    if (err) return next(err)

    res.send({ attendance })
  })
})

router.get('/:id', (req, res, next) => {
  Attendance.findById(req.params.id, (err, attendance) => {
    if (err) return next(err)

    res.send({ attendances })
  })
})

// todo
// router.put('/', fun...

router.put('/:id', (req, res, next) => {
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

router.delete('/:id', (req, res, next) => {
  Attendance.findById(req.params.id, (err, attendance) => {
    if (err) return next(err)

    attendance.remove(err => {
      if (err) return next(err)

      return res.send(true)
    })
  })
})
