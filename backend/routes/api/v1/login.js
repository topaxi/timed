import { Router } from 'express'
import passport   from 'passport'
import auth       from '../../../middleware/auth'
import User       from '../../../models/user'

export default function(app) {
  var router = new Router

  router.post('/login', passport.authenticate('local'), (req, res) => {
    res.send({ sessionId: req.sessionID, userId: req.user.id })
  })

  router.get('/whoami', auth, (req, res) => {
    var [ ip ]         = req.ips
    var { id: userId } = req.user

    res.send({ userId, ip })
  })

  router.get('/logout', logout)
        .post('/logout', logout)

  return router
}

function logout(req, res) {
  req.logout()
  res.redirect('/')
}
