var Project = require('../models/project')
  , Task    = require('../models/task')

module.exports = function(app) {
  app.get('/project', function(req, res, next) {
    if (req.query.id && req.query.id.length) {
      Project.find({ '_id': { $in: req.query.id } }, function(err, projects) {
        if (err) return next(err)

        res.send(projects)
      })
    }
    else {
      Project.find(function(err, projects) {
        if (err) return next(err)

        res.send(projects)
      })
    }
  })

  app.get('/project/:id', function(req, res, next) {
    Project.findById(req.params.id, function(err, project) {
      if (err) return next(err)

      res.send(project)
    })
  })

  app.get('/project/:id/tasks', function(req, res, next) {
    Task.find({ 'project': req.params.id }, function(err, tasks) {
      if (err) return next(err)

      res.send(tasks)
    })
  })

  app.post('/project', function(req, res, next) {
    var project = new Project({ 'name':  req.body.name
                              , 'from':  req.body.from
                              , 'to':    req.body.to
                              , 'tasks': req.body.tasks
                              , 'done':  req.body.done
                              })

    project.save(function(err) {
      if (err) return next(err)

      res.send(project)
    })
  })

  // todo
  // app.put('/project', fun...

  app.put('/project/:id', function(req, res, next) {
    Project.findById(req.params.id, function(err, project) {
      if (err) return next(err)

      project.name  = req.body.name
      project.tasks = req.body.tasks
      project.from  = req.body.from
      project.to    = req.body.to
      project.done  = req.body.done

      project.save(function(err) {
        if (err) return next(err)

        res.send(project)
      })
    })
  })

  app.delete('/project/:id', function(req, res, next) {
    Project.findById(req.params.id, function(err, project) {
      if (err) return next(err)

      project.remove(function(err) {
        if (err) return next(err)

        return res.send(true)
      })
    })
  })
}
