var Project = require('../models/project')
  , Task    = require('../models/task')
  , auth    = require('../middleware/auth')

module.exports = function(app) {
  app.get('/api/v1/projects', auth, function(req, res, next) {
    if (req.query.id && req.query.id.length) {
      Project.find({ '_id': { '$in': req.query.id } }, function(err, projects) {
        if (err) return next(err)

        res.send({ projects: projects })
      })
    }
    else {
      Project.find(function(err, projects) {
        if (err) return next(err)

        res.send({ projects: projects })
      })
    }
  })

  app.get('/api/v1/projects/:id', auth, function(req, res, next) {
    Project.findById(req.params.id, function(err, project) {
      if (err) return next(err)

      res.send({ project: project })
    })
  })

  app.post('/api/v1/projects', auth, function(req, res, next) {
    var project = new Project({ 'name':     req.body.project.name
                              , 'customer': req.body.project.customer
                              , 'from':     req.body.project.from
                              , 'to':       req.body.project.to
                              , 'tasks':    req.body.project.tasks
                              , 'done':     req.body.project.done
                              })

    project.save(function(err) {
      if (err) return next(err)

      res.send({ project: project })
    })
  })

  // todo
  // app.put('/api/v1/projects', auth, fun...

  app.put('/api/v1/projects/:id', auth, function(req, res, next) {
    Project.findById(req.params.id, function(err, project) {
      if (err) return next(err)

      project.name     = req.body.project.name
      project.customer = req.body.project.customer
      project.tasks    = req.body.project.tasks
      project.from     = req.body.project.from
      project.to       = req.body.project.to
      project.done     = req.body.project.done

      project.save(function(err) {
        if (err) return next(err)

        res.send({ project: project })
      })
    })
  })

  app.delete('/api/v1/projects/:id', auth, function(req, res, next) {
    Project.findById(req.params.id, function(err, project) {
      if (err) return next(err)

      Task.remove({ 'project': project }, function(err) {
        if (err) return next(err)

        project.remove(function(err) {
          if (err) return next(err)

          return res.send(true)
        })
      })
    })
  })
}
