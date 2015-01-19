var Router = require('express').Router
var Team   = require('../../../models/team')
var User   = require('../../../models/user')
var auth   = require('../../../middleware/auth')

module.exports = function(router) {
  var router = new Router
  router.use('/', auth)

  router.get('/', (req, res, next) => {
    Team.find((err, teams) => {
      if (err) return next(err)

      res.send({ teams })
    })
  })

  router.get('/:id', (req, res, next) => {
    Team.findById(req.params.id, (err, team) => {
      if (err) return next(err)

      res.send({ team })
    })
  })

  router.post('/', (req, res, next) => {
    var team = new Team({ 'name':  req.body.team.name
                        , 'users': req.body.team.users
                        })

    team.save(err => {
      if (err) return next(err)

      res.send({ team })
    })
  })

  // todo
  // router.put('/', fun...

  router.put('/:id', (req, res, next) => {
    Team.findById(req.params.id, (err, team) => {
      if (err) return next(err)

      team.name  = req.body.team.name  || team.name
      team.users = req.body.team.users || team.users

      team.save(err => {
        if (err) return next(err)

        res.send({ team })
      })
    })
  })

  router.delete('/:id', (req, res, next) => {
    Team.findById(req.params.id, (err, team) => {
      if (err) return next(err)

      team.remove(err => {
        if (err) return next(err)

        return res.send(true)
      })
    })
  })

  return router
}
