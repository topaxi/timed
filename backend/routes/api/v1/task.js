import { Router }           from 'express'
import mongoose             from 'mongoose'
import { async }            from '../../../src/async-route'
import { Task, Attendance } from '../../../models'
import auth                 from '../../../middleware/auth'

let router = new Router
export default router

router.use(auth)

router.get('/', async(function*(req, res, next) {
  let { ids } = req.query
  let tasks

  if (ids && ids.length) {
    tasks = yield Task.find({ '_id': { '$in': ids } }).exec()
  }
  else {
    tasks = yield Task.find(req.query).exec()
  }

  res.send({ tasks })
}))

router.get('/:id', async(function*(req, res, next) {
  let task = yield Task.findById(req.params.id).exec()

  res.send({ task })
}))

router.get('/:id/progress', async(function*(req, res, next) {
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

router.post('/', async(function*(req, res, next) {
  let task = new Task({ 'name':     req.body.task.name
                      , 'project':  req.body.task.project
                      , 'duration': req.body.task.duration
                      , 'from':     req.body.task.from
                      , 'to':       req.body.task.to
                      , 'tasks':    req.body.task.tasks
                      , 'priority': req.body.task.priority
                      , 'done':     !!req.body.task.done
                      })

  yield task.saveAsync()

  res.send({ task })
}))

// todo
// router.put('/', fun...

router.put('/:id', async(function*(req, res, next) {
  let task = yield Task.findById(req.params.id).exec()

  task.name     = req.body.task.name
  task.project  = req.body.task.project
  task.duration = req.body.task.duration
  task.tasks    = req.body.task.tasks
  task.from     = req.body.task.from
  task.to       = req.body.task.to
  task.priority = req.body.task.priority
  task.done     = req.body.task.done

  yield task.saveAsync()

  res.send({ task })
}))

router.delete('/:id', async(function*(req, res, next) {
  let task = yield Task.findById(req.params.id).exec()

  yield task.removeAsync()

  res.send(true)
}))
