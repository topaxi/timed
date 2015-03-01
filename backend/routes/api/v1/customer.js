import { Router }   from 'express'
import { async }    from '../../../src/async-route'
import { Customer } from '../../../models'
import auth         from '../../../middleware/auth'

let router = new Router
export default router

router.use(auth)

router.get('/', async(function*(req, res, next) {
  let customers = yield Customer.find(req.query).exec()

  res.send({ customers })
}))

router.post('/', async(function*(req, res, next) {
  let customer = new Customer({ 'name': req.body.customer.name })

  yield customer.saveAsync()

  res.send({ customer })
}))

router.get('/:id', async(function*(req, res, next) {
  let customer = yield Customer.findById(req.params.id).exec()

  res.send({ customer })
}))

// todo
// router.put('/', fun...

router.put('/:id', async(function*(req, res, next) {
  let customer = yield Customer.findById(req.params.id).exec()

  customer.name = req.body.customer.name

  yield customer.saveAsync()

  res.send({ customer })
}))

router.delete('/:id', async(function*(req, res, next) {
  let customer = yield Customer.findById(req.params.id).exec()

  yield customer.removeAsync()

  res.send(true)
}))
