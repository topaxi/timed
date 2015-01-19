var Task       = require('../models/task')
var Attendance = require('../models/attendance')
var mongoose   = require('mongoose')
var auth       = require('../middleware/auth')

module.exports = function(app) {
  app.get('/api/v1/tasks', auth, (req, res, next) => {
    var { ids } = req.query

    if (ids && ids.length) {
      Task.find({ '_id': { '$in': ids } }, (err, tasks) => {
        if (err) return next(err)

        res.send({ tasks })
      })
    }
    else {
      Task.find(req.query, (err, tasks) => {
        if (err) return next(err)

        res.send({ tasks })
      })
    }
  })

  app.get('/api/v1/tasks/:id', auth, (req, res, next) => {
    Task.findById(req.params.id, (err, task) => {
      if (err) return next(err)

      res.send({ task })
    })
  })

  app.get('/api/v1/tasks/:id/progress', auth, (req, res, next) => {
    var id = new mongoose.Types.ObjectId(req.params.id)

    Attendance.aggregate([
      { $unwind:  '$activities' }
    , { $match:   { 'activities.task': id } }
    , { $project: { _id: false, duration: { $subtract: [ '$activities.to', '$activities.from' ] } } }
    , { $group:   { _id: null, progress: { $sum: '$duration' } } }
    ], function(err, result) {
      var progress = result && result[0] && result[0].progress

      res.send({ progress })
    })
  })

  app.post('/api/v1/tasks', auth, (req, res, next) => {
    var task = new Task({ 'name':     req.body.task.name
                        , 'project':  req.body.task.project
                        , 'duration': req.body.task.duration
                        , 'from':     req.body.task.from
                        , 'to':       req.body.task.to
                        , 'tasks':    req.body.task.tasks
                        , 'priority': req.body.task.priority
                        , 'done':     !!req.body.task.done
                        })

    task.save(err => {
      if (err) return next(err)

      res.send({ task })
    })
  })

  // todo
  // app.put('/api/v1/tasks', auth, fun...

  app.put('/api/v1/tasks/:id', auth, (req, res, next) => {
    Task.findById(req.params.id, (err, task) => {
      if (err) return next(err)

      task.name     = req.body.task.name
      task.project  = req.body.task.project
      task.duration = req.body.task.duration
      task.tasks    = req.body.task.tasks
      task.from     = req.body.task.from
      task.to       = req.body.task.to
      task.priority = req.body.task.priority
      task.done     = req.body.task.done

      task.save(err => {
        if (err) return next(err)

        res.send({ task })
      })
    })
  })

  app.delete('/api/v1/tasks/:id', auth, (req, res, next) => {
    Task.findById(req.params.id, (err, task) => {
      if (err) return next(err)

      task.remove(err => {
        if (err) return next(err)

        return res.send(true)
      })
    })
  })
}
