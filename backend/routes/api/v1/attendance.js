import { Router }        from 'express'
import { async }         from '../../../src/async-route'
import { NotFoundError } from '../../../src/error'
import { Attendance }    from '../../../models'
import auth              from '../../../middleware/auth'

let router = new Router
export default router

router.use(auth)

router.get('/', async(function*(req, res, next) {
  if (req.query.from) req.query.from = { '$gte': new Date(+req.query.from) }
  if (req.query.to)   req.query.to   = { '$lte': new Date(+req.query.to)   }

  let attendances = yield Attendance.find(req.query).exec()

  res.send({ attendances })
}))

router.post('/', async(function*(req, res, next) {
  let attendance = new Attendance(req.body.attendance)

  yield attendance.saveAsync()

  res.status(201)
  res.send({ attendance })
}))

router.get('/:id', async(function*(req, res, next) {
  let attendance = yield Attendance.findById(req.params.id).exec()

  if (!attendance) {
    throw new NotFoundError
  }

  res.send({ attendance })
}))

// todo
// router.put('/', fun...

router.put('/:id', async(function*(req, res, next) {
  let { id }                 = req.params.id
  let { attendance: update } = req.body
  let attendance             = yield Attendance.findByIdAndUpdate(id, update).exec()

  res.send({ attendance })
}))

router.delete('/:id', async(function*(req, res, next) {
  yield Attendance.findByIdAndRemove(req.params.id).exec()

  res.send(true)
}))
