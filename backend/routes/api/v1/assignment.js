import { Router }        from 'express'
import { NotFoundError } from '../../../src/error'
import { Assignment }    from '../../../models'

let router = new Router
export default router

const lean = true

router.get('/assignments', async(req, res, next) => {
  let { query } = req

  if (query.from) query.from = { '$gte': new Date(+query.from) }
  if (query.to)   query.to   = { '$lte': new Date(+query.to  ) }

  let assignments = await Assignment.find(query).lean(true).exec()

  res.send({ assignments })
})

router.post('/assignments', async(req, res, next) => {
  let assignment = new Assignment(req.body.assignment)

  await assignment.save()

  res.status(201)
  res.pushModel({ assignment })
})

router.get('/assignments/:id', async(req, res, next) => {
  let assignment = await Assignment.findById(req.params.id).lean(true).exec()

  if (!assignment) {
    throw new NotFoundError
  }

  res.send({ assignment })
})

// todo
// router.put('/', fun...

router.put('/assignments/:id', async(req, res, next) => {
  let { id }                 = req.params
  let { assignment: update } = req.body
  let assignment             = await Assignment.findByIdAndUpdate(id, update, { 'new': true }).exec()

  res.pushModel({ assignment })
})

router.delete('/assignments/:id', async({ params: { id } }, res, next) => {
  await Assignment.findByIdAndRemove(id).exec()

  res.unloadModel('attendance', id)
})
