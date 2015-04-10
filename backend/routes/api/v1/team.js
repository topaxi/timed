import { Router }        from 'express'
import { async }         from '../../../src/async-route'
import { NotFoundError } from '../../../src/error'
import { Team }          from '../../../models'

let router = new Router
export default router

router.get('/teams', async(function*(req, res, next) {
  let teams = yield Team.find(req.query).exec()

  res.send({ teams })
}))

router.get('/teams/:id', async(function*(req, res, next) {
  let team = yield Team.findById(req.params.id).exec()

  if (!team) {
    throw new NotFoundError
  }

  res.send({ team })
}))

router.post('/teams', async(function*(req, res, next) {
  let team = new Team(req.body.team)

  yield team.save()

  res.status(201)
  res.pushModel({ team })
}))

// todo
// router.put('/', fun...

router.put('/teams/:id', async(function*(req, res, next) {
  let { id }           = req.params
  let { team: update } = req.body
  let team             = yield Team.findByIdAndUpdate(id, update, { 'new': true }).exec()

  res.pushModel({ team })
}))

router.delete('/teams/:id', async(function*({ params: { id } }, res, next) {
  yield Team.findByIdAndRemove(id).exec()

  res.unloadModel('team', id)
}))
