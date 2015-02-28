import { Router } from 'express'
import { async }  from '../../../src/async-route'
import { User }   from '../../../models'
import auth       from '../../../middleware/auth'

let router = new Router
export default router

router.use(auth)

router.get('/', async(function*(req, res, next) {
  let users = yield User.find(req.query).exec()

  users.forEach(deletePasswordForResponse)

  res.send({ users })
}))

router.get('/:id', async(function*(req, res, next) {
  let user = yield User.findById(req.params.id).exec()

  deletePasswordForResponse(user)

  res.send({ user })
}))

router.post('/', async(function*(req, res, next) {
  let user = new User({ 'name':      req.body.user.name
                      , 'firstName': req.body.user.firstName
                      , 'lastName':  req.body.user.lastName
                      , 'quota':     req.body.user.quota
                      , 'password':  req.body.user.password
                      , 'projects':  req.body.user.projects
                      , 'worktime':  req.body.user.worktime
                      })

  yield user.saveAsync()

  deletePasswordForResponse(user)

  res.send({ user })
}))

// todo
// router.put('/', fun...

router.put('/:id', async(function*(req, res, next) {
  let user = yield User.findById(req.params.id).exec()

  user.name      = req.body.user.name      || user.name
  user.firstName = req.body.user.firstName || user.firstName
  user.lastName  = req.body.user.lastName  || user.lastName
  user.quota     = req.body.user.quota     || user.quota
  user.projects  = req.body.user.projects  || user.projects
  user.worktime  = req.body.user.worktime  || user.worktime

  if (req.body.user.password) {
    if (user.password) {
      if (!(yield user.comparePassword(req.body.user.password))) {
        yield user.setPassword(req.body.user.password)
      }
    }
    else {
      yield user.setPassword(req.body.user.password)
    }
  }

  yield user.saveAsync()

  // Update currently logged in user
  if (user._id == req.user._id) {
    req.user = user
  }

  deletePasswordForResponse(user)

  res.send({ user })
}))

router.delete('/:id', async(function*(req, res, next) {
  let user = yield User.findById(req.params.id).exec()

  yield user.removeAsync()

  res.send(true)
}))

function deletePasswordForResponse(user) {
  user.password = undefined
}
