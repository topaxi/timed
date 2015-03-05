import { Router }        from 'express'
import { async }         from '../../../src/async-route'
import { NotFoundError } from '../../../src/error'
import { User }          from '../../../models'
import auth              from '../../../middleware/auth'

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

  if (!user) {
    throw new NotFoundError
  }

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
  let newPassword = req.body.user.password

  delete req.body.user.password

  let user = yield User.findByIdAndUpdate(req.params.id, req.body.user).exec()

  if (newPassword) {
    yield user.setPassword(newPassword)
  }

  yield user.saveAsync()

  // Update currently logged in user
  if (req.user && user._id == req.user._id) {
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
