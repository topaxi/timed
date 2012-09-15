var Task = require('../models/task')

module.exports = function(app) {
  app.get('/task', function(req, res, next) {
    Task.find(function(err, tasks) {
      if (err) return next(err)

      res.send(tasks)
    })
  })

  app.get('/task/:id', function(req, res, next) {
    Task.findById(req.params.id, function(err, task) {
      if (err) return next(err)

      res.send(task)
    })
  })

  app.post('/task', function(req, res, next) {
    var task = new Task({ 'name':     req.body.name
                        // Project may be an id or an object
                        , 'project':  req.body.project._id || req.body.project
                        , 'duration': req.body.duration
                        , 'from':     req.body.from
                        , 'to':       req.body.to
                        , 'tasks':    req.body.tasks
                        , 'done':     !!req.body.done
                        })

    task.save(function(err) {
      if (err) return next(err)

      res.send(task)
    })
  })

  // todo
  // app.put('/task', fun...

  app.put('/task/:id', function(req, res, next) {
    Task.findById(req.params.id, function(err, task) {
      if (err) return next(err)

      task.name     = req.body.name
      task.project  = req.body.project._id || req.body.project
      task.duration = req.body.duration
      task.tasks    = req.body.tasks
      task.from     = req.body.from
      task.to       = req.body.to
      task.done     = req.body.done

      task.save(function(err) {
        if (err) return next(err)

        res.send(task)
      })
    })
  })

  app.delete('/task/:id', function(req, res, next) {
    Task.findById(req.params.id, function(err, task) {
      if (err) return next(err)

      task.remove(function(err) {
        if (err) return next(err)

        return res.send(true)
      })
    })
  })
}
