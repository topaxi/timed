var Project = require('../models/project')
  , Task    = require('../models/task')
  , auth    = require('../middleware/auth')

module.exports = function(app) {
  app.get('/api/v1/projects', auth, (req, res, next) => {
    var { ids } = req.query.ids

    if (ids && ids.length) {
      Project.find({ '_id': { '$in': ids } }, (err, projects) => {
        if (err) return next(err)

        res.send({ projects })
      })
    }
    else {
      Project.find((err, projects) => {
        if (err) return next(err)

        res.send({ projects })
      })
    }
  })

  app.get('/api/v1/projects/:id', auth, (req, res, next) => {
    Project.findById(req.params.id, (err, project) => {
      if (err) return next(err)

      res.send({ project })
    })
  })

  app.post('/api/v1/projects', auth, (req, res, next) => {
    var project = new Project({ 'name':     req.body.project.name
                              , 'customer': req.body.project.customer
                              , 'from':     req.body.project.from
                              , 'to':       req.body.project.to
                              , 'done':     req.body.project.done
                              })

    project.save(err => {
      if (err) return next(err)

      res.send({ project })
    })
  })

  // todo
  // app.put('/api/v1/projects', auth, fun...

  app.put('/api/v1/projects/:id', auth, (req, res, next) => {
    Project.findById(req.params.id, (err, project) => {
      if (err) return next(err)

      project.name     = req.body.project.name
      project.customer = req.body.project.customer
      project.from     = req.body.project.from
      project.to       = req.body.project.to
      project.done     = req.body.project.done

      project.save(err => {
        if (err) return next(err)

        res.send({ project })
      })
    })
  })

  app.delete('/api/v1/projects/:id', auth, (req, res, next) => {
    Project.findById(req.params.id, (err, project) => {
      if (err) return next(err)

      Task.remove({ project }, err => {
        if (err) return next(err)

        project.remove(err => {
          if (err) return next(err)

          return res.send(true)
        })
      })
    })
  })
}
