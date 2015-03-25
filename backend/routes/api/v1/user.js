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
  let user = new User(req.body.user)

  if (req.body.user.password) {
    yield user.setPassword(req.body.user.password)
  }

  yield user.save()

  deletePasswordForResponse(user)

  res.status(201)
  res.pushModel({ user })
}))

// todo
// router.put('/', fun...

router.put('/:id', async(function*(req, res, next) {
  let newPassword = req.body.user.password

  delete req.body.user.password

  let { id }           = req.params
  let { user: update } = req.body
  let user             = yield User.findByIdAndUpdate(id, update, { 'new': true }).exec()

  if (newPassword) {
    yield user.setPassword(newPassword)
    yield user.save()
  }

  deletePasswordForResponse(user)

  res.pushModel({ user })
}))

router.delete('/:id', async(function*({ params: { id } }, res, next) {
  yield User.findByIdAndRemove(id).exec()

  res.unloadModel('user', id)
}))

function deletePasswordForResponse(user) {
  user.password = undefined
}
