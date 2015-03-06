import { Router }           from 'express'
import mongoose             from 'mongoose'
import { async }            from '../../../src/async-route'
import { NotFoundError }    from '../../../src/error'
import { Task, Attendance } from '../../../models'
import auth                 from '../../../middleware/auth'

let router = new Router
export default router

router.use(auth)

router.get('/', async(function*(req, res, next) {
  let { ids }  = req.query
  let query    = ids && ids.length ? { '_id': { '$in': ids } } : req.query
  let tasks = yield Task.find(query).exec()

  res.send({ tasks })
}))

router.get('/:id', async(function*(req, res, next) {
  let task = yield Task.findById(req.params.id).exec()

  if (!task) {
    throw new NotFoundError
  }

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
  let task = yield Task.findByIdAndUpdate(req.params.id, req.body.task).exec()

  res.send({ task })
}))

router.delete('/:id', async(function*(req, res, next) {
  let task = yield Task.findById(req.params.id).exec()

  yield task.removeAsync()

  res.send(true)
}))
