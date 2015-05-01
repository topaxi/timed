import { Router }        from 'express'
import { NotFoundError } from '../../../src/error'
import { Customer }      from '../../../models'

let router = new Router
export default router

router.get('/customers', async(req, res, next) => {
  let customers = await Customer.find(req.query).lean(true).exec()

  res.send({ customers })
})

router.post('/customers', async(req, res, next) => {
  let customer = new Customer(req.body.customer)

  await customer.save()

  res.status(201)
  res.pushModel({ customer })
})

router.get('/customers/:id', async(req, res, next) => {
  let customer = await Customer.findById(req.params.id).lean(true).exec()

  if (!customer) {
    throw new NotFoundError
  }

  res.send({ customer })
})

// todo
// router.put('/', fun...

router.put('/customers/:id', async(req, res, next) => {
  let { id }               = req.params
  let { customer: update } = req.body
  let customer             = await Customer.findByIdAndUpdate(id, update, { 'new': true }).exec()

  res.pushModel({ customer })
})

router.delete('/customers/:id', async({ params: { id } }, res, next) => {
  await Customer.findByIdAndRemove(id).exec()

  res.unloadModel('customer', id)
})
