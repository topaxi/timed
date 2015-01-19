var Team    = require('../models/team')
  , User    = require('../models/user')
  , auth    = require('../middleware/auth')

module.exports = function(app) {
  app.get('/api/v1/teams', auth, (req, res, next) => {
    Team.find((err, teams) => {
      if (err) return next(err)

      res.send({ teams })
    })
  })

  app.get('/api/v1/teams/:id', auth, (req, res, next) => {
    Team.findById(req.params.id, (err, team) => {
      if (err) return next(err)

      res.send({ team })
    })
  })

  app.post('/api/v1/teams', auth, (req, res, next) => {
    var team = new Team({ 'name':  req.body.team.name
                        , 'users': req.body.team.users
                        })

    team.save(err => {
      if (err) return next(err)

      res.send({ team })
    })
  })

  // todo
  // app.put('/api/v1/teams', auth, fun...

  app.put('/api/v1/teams/:id', auth, (req, res, next) => {
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

  app.delete('/api/v1/teams/:id', auth, (req, res, next) => {
    Team.findById(req.params.id, (err, team) => {
      if (err) return next(err)

      team.remove(err => {
        if (err) return next(err)

        return res.send(true)
      })
    })
  })
}
