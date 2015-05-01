import { Router }        from 'express'
import { NotFoundError } from '../../../src/error'
import { User }          from '../../../models'

let router = new Router
export default router

const lean = true

router.get('/users', async(req, res, next) => {
  let users = await User.find(req.query).lean(true).exec()

  users.forEach(deletePasswordForResponse)

  res.send({ users })
})

router.get('/users/:id', async(req, res, next) => {
  let user = await User.findById(req.params.id).lean(true).exec()

  if (!user) {
    throw new NotFoundError
  }

  deletePasswordForResponse(user)

  res.send({ user })
})

router.post('/users', async(req, res, next) => {
  let user = new User(req.body.user)

  if (req.body.user.password) {
    await user.setPassword(req.body.user.password)
  }

  await user.save()

  deletePasswordForResponse(user)

  res.status(201)
  res.pushModel({ user })
})

// todo
// router.put('/', fun...

router.put('/users/:id', async(req, res, next) => {
  let newPassword = req.body.user.password

  delete req.body.user.password

  let { id }           = req.params
  let { user: update } = req.body
  let user             = await User.findByIdAndUpdate(id, update, { 'new': true }).exec()

  if (newPassword) {
    await user.setPassword(newPassword)
    await user.save()
  }

  deletePasswordForResponse(user)

  res.pushModel({ user })
})

router.delete('/users/:id', async({ params: { id } }, res, next) => {
  await User.findByIdAndRemove(id).exec()

  res.unloadModel('user', id)
})

function deletePasswordForResponse(user) {
  user.password = undefined
}
