var Router     = require('express').Router
var Assignment = require('../../../models/assignment')
var auth       = require('../../../middleware/auth')

module.exports = function(app, router) {
  var router = new Router
  router.use('/', auth)

  router.get('/', (req, res, next) => {
    Assignment.find(req.query, (err, assignments) => {
      if (err) return next(err)

      res.send({ assignments })
    })
  })

  router.post('/', auth, (req, res, next) => {
    var assignment = new Assignment(req.body.assignment)

    assignment.save(err => {
      if (err) return next(err)

      res.send({ assignment })
    })
  })

  router.get('/:id', (req, res, next) => {
    Assignment.findById(req.params.id, (err, assignment) => {
      if (err) return next(err)

      res.send({ assignment })
    })
  })

  // todo
  // router.put('/', fun...

  router.put('/:id', (req, res, next) => {
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

  router.delete('/:id', (req, res, next) => {
    Assignment.findById(req.params.id, (err, assignment) => {
      if (err) return next(err)

      assignment.remove(err => {
        if (err) return next(err)

        return res.send(true)
      })
    })
  })

  return router
}
