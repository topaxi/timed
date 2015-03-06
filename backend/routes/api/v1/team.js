import { Router }        from 'express'
import { async }         from '../../../src/async-route'
import { NotFoundError } from '../../../src/error'
import { Team }          from '../../../models'
import auth              from '../../../middleware/auth'

let router = new Router
export default router

router.use(auth)

router.get('/', async(function*(req, res, next) {
  let teams = yield Team.find(req.query).exec()

  res.send({ teams })
}))

router.get('/:id', async(function*(req, res, next) {
  let team = yield Team.findById(req.params.id).exec()

  if (!team) {
    throw new NotFoundError
  }

  res.send({ team })
}))

router.post('/', async(function*(req, res, next) {
  let team = new Team({ 'name':  req.body.team.name
                      , 'users': req.body.team.users
                      })

  yield team.saveAsync()

  res.send({ team })
}))

// todo
// router.put('/', fun...

router.put('/:id', async(function*(req, res, next) {
  let team = yield Team.findByIdAndUpdate(req.params.id, req.body.team).exec()

  res.send({ team })
}))

router.delete('/:id', async(function*(req, res, next) {
  yield Team.findByIdAndRemove(req.params.id).exec()

  res.send(true)
}))
