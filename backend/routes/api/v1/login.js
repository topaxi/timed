import { Router } from 'express'
import passport   from 'passport'
import app        from '../../../src/app'

let router = new Router
export default router

router.post('/login', (req, res, next) =>
  passport.authenticate('local', (err, user, info, status) => {
    if (err)   return next(err)
    if (!user) return next({ status, message: info.message })

    req.login(user, loginError => {
      /* istanbul ignore if */
      if (loginError) return next(loginError)

      res.send({ sessionId: req.sessionID, userId: req.user.id })
    })
  })(req, res, next)
)

router.get('/whoami', (req, res) => {
  let userId  = req.user && req.user.id
  let version = app.get('version')

  res.send({ userId, version })
})

router.get('/logout', logout)
      .post('/logout', logout)

function logout(req, res) {
  req.logout()
  req.session.destroy()
  res.redirect('/')
}
