import { Router }           from 'express'
import mongoose             from 'mongoose'
import { NotFoundError }    from '../../../src/error'
import { Task, Attendance } from '../../../models'

let router = new Router
export default router

const lean = true

router.get('/tasks', async(req, res, next) => {
  let { ids } = req.query
  let query   = ids && ids.length ? { '_id': { '$in': ids } } : req.query
  let tasks   = await Task.find(query).lean(true).exec()

  res.send({ tasks })
})

router.get('/tasks/:id', async(req, res, next) => {
  let task = await Task.findById(req.params.id).lean(true).exec()

  if (!task) {
    throw new NotFoundError
  }

  res.send({ task })
})

router.get('/tasks/:id/progress', async(req, res, next) => {
  let id = new mongoose.Types.ObjectId(req.params.id)

  let result = await Attendance.aggregate([
    { $unwind:  '$activities' }
  , { $match:   { 'activities.task': id } }
  , { $project: { _id: false, duration: { $subtract: [ '$activities.to', '$activities.from' ] } } }
  , { $group:   { _id: null, progress: { $sum: '$duration' } } }
  ]).exec()

  let progress = result && result[0] && result[0].progress

  res.send({ progress })
})

router.post('/tasks', async(req, res, next) => {
  let task = new Task(req.body.task)

  await task.save()

  res.status(201)
  res.pushModel({ task })
})

// todo
// router.put('/', fun...

router.put('/tasks/:id', async(req, res, next) => {
  let { id }           = req.params
  let { task: update } = req.body
  let task             = await Task.findByIdAndUpdate(id, update, { 'new': true }).exec()

  res.pushModel({ task })
})

router.delete('/tasks/:id', async({ params: { id } }, res, next) => {
  await Task.findByIdAndRemove(id).exec()

  res.unloadModel('task', id)
})
