import { Router }           from 'express'
import mongoose             from 'mongoose'
import { async }            from '../../../src/async-route'
import { NotFoundError }    from '../../../src/error'
import { Task, Attendance } from '../../../models'

let router = new Router
export default router

router.get('/tasks', async(function*(req, res, next) {
  let { ids } = req.query
  let query   = ids && ids.length ? { '_id': { '$in': ids } } : req.query
  let tasks   = yield Task.find(query).exec()

  res.send({ tasks })
}))

router.get('/tasks/:id', async(function*(req, res, next) {
  let task = yield Task.findById(req.params.id).exec()

  if (!task) {
    throw new NotFoundError
  }

  res.send({ task })
}))

router.get('/tasks/:id/progress', async(function*(req, res, next) {
  let id = new mongoose.Types.ObjectId(req.params.id)

  let result = yield Attendance.aggregate([
    { $unwind:  '$activities' }
  , { $match:   { 'activities.task': id } }
  , { $project: { _id: false, duration: { $subtract: [ '$activities.to', '$activities.from' ] } } }
  , { $group:   { _id: null, progress: { $sum: '$duration' } } }
  ]).exec()

  let progress = result && result[0] && result[0].progress

  res.send({ progress })
}))

router.post('/tasks', async(function*(req, res, next) {
  let task = new Task(req.body.task)

  yield task.save()

  res.status(201)
  res.pushModel({ task })
}))

// todo
// router.put('/', fun...

router.put('/tasks/:id', async(function*(req, res, next) {
  let { id }           = req.params
  let { task: update } = req.body
  let task             = yield Task.findByIdAndUpdate(id, update, { 'new': true }).exec()

  res.pushModel({ task })
}))

router.delete('/tasks/:id', async(function*({ params: { id } }, res, next) {
  yield Task.findByIdAndRemove(id).exec()

  res.unloadModel('task', id)
}))
