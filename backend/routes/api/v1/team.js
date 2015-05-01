import { Router }        from 'express'
import { NotFoundError } from '../../../src/error'
import { Team }          from '../../../models'

let router = new Router
export default router

router.get('/teams', async(req, res, next) => {
  let teams = await Team.find(req.query).lean(true).exec()

  res.send({ teams })
})

router.get('/teams/:id', async(req, res, next) => {
  let team = await Team.findById(req.params.id).lean(true).exec()

  if (!team) {
    throw new NotFoundError
  }

  res.send({ team })
})

router.post('/teams', async(req, res, next) => {
  let team = new Team(req.body.team)

  await team.save()

  res.status(201)
  res.pushModel({ team })
})

// todo
// router.put('/', fun...

router.put('/teams/:id', async(req, res, next) => {
  let { id }           = req.params
  let { team: update } = req.body
  let team             = await Team.findByIdAndUpdate(id, update, { 'new': true }).exec()

  res.pushModel({ team })
})

router.delete('/teams/:id', async({ params: { id } }, res, next) => {
  await Team.findByIdAndRemove(id).exec()

  res.unloadModel('team', id)
})
