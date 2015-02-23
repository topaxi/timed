import { Router } from 'express'
import passport   from 'passport'
import auth       from '../../../middleware/auth'

var router = new Router
export default router

router.post('/login', (req, res, next) =>
  passport.authenticate('local', (err, user, info, status) => {
    if (err)   return next(err)
    if (!user) return next({ status, message: info.message })

    req.logIn(user, err => {
      if (err) return next(err)

      res.send({ sessionId: req.sessionID, userId: req.user.id })
    })
  })(req, res, next)
)

router.get('/whoami', auth, (req, res) => {
  var [ ip ]         = req.ips
  var { id: userId } = req.user

  res.send({ userId, ip })
})

router.get('/logout', logout)
      .post('/logout', logout)

function logout(req, res) {
  req.logout()
  res.redirect('/')
}
