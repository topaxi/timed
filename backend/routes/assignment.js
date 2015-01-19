var Assignment = require('../models/assignment')
  , auth = require('../middleware/auth')

module.exports = function(app) {
  app.get('/api/v1/assignments', auth, (req, res, next) => {
    Assignment.find(req.query, (err, assignments) => {
      if (err) return next(err)

      res.send({ assignments })
    })
  })

  app.get('/api/v1/assignments/:id', auth, (req, res, next) => {
    Assignment.findById(req.params.id, (err, assignment) => {
      if (err) return next(err)

      res.send({ assignment })
    })
  })

  app.post('/api/v1/assignments', auth, (req, res, next) => {
    var assignment = new Assignment(req.body.assignment)

    assignment.save(err => {
      if (err) return next(err)

      res.send({ assignment })
    })
  })

  // todo
  // app.put('/api/v1/assignments', auth, fun...

  app.put('/api/v1/assignments/:id', auth, (req, res, next) => {
    Assignment.findById(req.params.id, (err, assignment) => {
      if (err) return next(err)

      assignment.user     = req.body.assignment.user
      assignment.from     = req.body.assignment.from
      assignment.to       = req.body.assignment.to
      assignment.duration = req.body.assignment.duration
      assignment.project  = req.body.assignment.project
      assignment.tasks    = req.body.assignment.tasks

      assignment.save(err => {
        if (err) return next(err)

        res.send({ assignment })
      })
    })
  })

  app.delete('/api/v1/assignments/:id', auth, (req, res, next) => {
    Assignment.findById(req.params.id, (err, assignment) => {
      if (err) return next(err)

      assignment.remove(err => {
        if (err) return next(err)

        return res.send(true)
      })
    })
  })
}
