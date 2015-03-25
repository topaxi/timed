import { Router }        from 'express'
import { async }         from '../../../src/async-route'
import { NotFoundError } from '../../../src/error'
import { Attendance }    from '../../../models'
import auth              from '../../../middleware/auth'

let router = new Router
export default router

router.use(auth)

router.get('/', async(function*(req, res, next) {
  let { query } = req

  if (query.from) query.from = { '$gte': new Date(+query.from) }
  if (query.to)   query.to   = { '$lte': new Date(+query.to)   }

  let attendances = yield Attendance.find(query).exec()

  res.send({ attendances })
}))

router.post('/', async(function*(req, res, next) {
  let attendance = new Attendance(req.body.attendance)

  yield attendance.save()

  res.status(201)
  res.pushModel({ attendance })
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
  let { id }                 = req.params
  let { attendance: update } = req.body
  let attendance             = yield Attendance.findByIdAndUpdate(id, update).exec()

  res.pushModel({ attendance })
}))

router.delete('/:id', async(function*({ params: { id } }, res, next) {
  yield Attendance.findByIdAndRemove(id).exec()

  res.unloadModel('attendance', id)
}))
