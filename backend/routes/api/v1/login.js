import { Router } from 'express'
import passport   from 'passport'
import User       from '../../../models/user'

export default function(app) {
  var router = new Router

  router.post('/login', passport.authenticate('local'), (req, res) => {
    res.send({ sessionId: req.sessionID, userId: req.user.id })
  })

  router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })

  return router
}
