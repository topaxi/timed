var Task = require('../models/task')
  , auth = require('../middleware/auth')

module.exports = function(app) {
  app.get('/api/v1/tasks', auth, function(req, res, next) {
    Task.find(req.query, function(err, tasks) {
      if (err) return next(err)

      res.send({ tasks: tasks })
    })
  })

  app.get('/api/v1/tasks/:id', auth, function(req, res, next) {
    Task.findById(req.params.id, function(err, task) {
      if (err) return next(err)

      res.send({ task: task })
    })
  })

  app.post('/api/v1/tasks', auth, function(req, res, next) {
    var task = new Task({ 'name':     req.body.task.name
                        // Project may be an id or an object
                        , 'project':  req.body.task.project._id || req.body.task.project
                        , 'duration': req.body.task.duration
                        , 'from':     req.body.task.from
                        , 'to':       req.body.task.to
                        , 'tasks':    req.body.task.tasks
                        , 'priority': req.body.task.priority
                        , 'done':     !!req.body.task.done
                        })

    task.save(function(err) {
      if (err) return next(err)

      res.send({ task: task })
    })
  })

  // todo
  // app.put('/api/v1/tasks', auth, fun...

  app.put('/api/v1/tasks/:id', auth, function(req, res, next) {
    Task.findById(req.params.id, function(err, task) {
      if (err) return next(err)

      task.name     = req.body.task.name
      task.project  = req.body.task.project._id || req.body.task.project
      task.duration = req.body.task.duration
      task.tasks    = req.body.task.tasks
      task.from     = req.body.task.from
      task.to       = req.body.task.to
      task.priority = req.body.task.priority
      task.done     = req.body.task.done

      task.save(function(err) {
        if (err) return next(err)

        res.send({ task: task })
      })
    })
  })

  app.delete('/api/v1/tasks/:id', auth, function(req, res, next) {
    Task.findById(req.params.id, function(err, task) {
      if (err) return next(err)

      task.remove(function(err) {
        if (err) return next(err)

        return res.send(true)
      })
    })
  })
}
