import { Router }        from 'express'
import { async }         from '../../../src/async-route'
import { NotFoundError } from '../../../src/error'
import { Customer }      from '../../../models'
import auth              from '../../../middleware/auth'

let router = new Router
export default router

router.use(auth)

router.get('/', async(function*(req, res, next) {
  let customers = yield Customer.find(req.query).exec()

  res.send({ customers })
}))

router.post('/', async(function*(req, res, next) {
  let customer = new Customer(req.body.customer)

  yield customer.save()

  res.status(201)
  res.pushModel({ customer })
}))

router.get('/:id', async(function*(req, res, next) {
  let customer = yield Customer.findById(req.params.id).exec()

  if (!customer) {
    throw new NotFoundError
  }

  res.send({ customer })
}))

// todo
// router.put('/', fun...

router.put('/:id', async(function*(req, res, next) {
  let { id }               = req.params
  let { customer: update } = req.body
  let customer             = yield Customer.findByIdAndUpdate(id, update, { 'new': true }).exec()

  res.pushModel({ customer })
}))

router.delete('/:id', async(function*({ params: { id } }, res, next) {
  yield Customer.findByIdAndRemove(id).exec()

  res.unloadModel('customer', id)
}))
