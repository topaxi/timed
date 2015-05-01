import { Router }        from 'express'
import { NotFoundError } from '../../../src/error'
import { Attendance }    from '../../../models'

let router = new Router
export default router

const lean = true

router.get('/attendances', async(req, res, next) => {
  let { query } = req

  if (query.from) query.from = { '$gte': new Date(+query.from) }
  if (query.to)   query.to   = { '$lte': new Date(+query.to  ) }

  let attendances = await Attendance.find(query).lean(true)
                                    .sort({ 'from': -1 })
                                    .limit(100).exec()

  res.send({ attendances })
})

router.post('/attendances', async(req, res, next) => {
  let attendance = new Attendance(req.body.attendance)

  await attendance.save()

  res.status(201)
  res.pushModel({ attendance })
})

router.get('/attendances/:id', async(req, res, next) => {
  let attendance = await Attendance.findById(req.params.id).lean(true).exec()

  if (!attendance) {
    throw new NotFoundError
  }

  res.send({ attendance })
})

// todo
// router.put('/', fun...

router.put('/attendances/:id', async(req, res, next) => {
  let { id }                 = req.params
  let { attendance: update } = req.body
  let attendance             = await Attendance.findByIdAndUpdate(id, update, { 'new': true }).exec()

  res.pushModel({ attendance })
})

router.delete('/attendances/:id', async({ params: { id } }, res, next) => {
  await Attendance.findByIdAndRemove(id).exec()

  res.unloadModel('attendance', id)
})
