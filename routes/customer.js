var Customer = require('../models/customer')

module.exports = function(app) {
  app.get('/customer', function(req, res, next) {
    if (req.query.name) {
      Customer.find({ 'name': req.query.name }, function(err, customers) {
        if (err) return next(err)

        res.send(customers)
      })
    }
    else {
      Customer.find(function(err, customers) {
        if (err) return next(err)

        res.send(customers)
      })
    }
  })

  app.get('/customer/:id', function(req, res, next) {
    Customer.findById(req.params.id, function(err, customer) {
      if (err) return next(err)

      res.send(customer)
    })
  })

  app.post('/customer', function(req, res, next) {
    var customer = new Customer({ 'name': req.body.name })

    customer.save(function(err) {
      if (err) return next(err)

      res.send(customer)
    })
  })

  // todo
  // app.put('/customer', fun...

  app.put('/customer/:id', function(req, res, next) {
    Customer.findById(req.params.id, function(err, customer) {
      if (err) return next(err)

      customer.name     = req.body.name
      customer.projects = req.body.projects

      customer.save(function(err) {
        if (err) return next(err)

        res.send(customer)
      })
    })
  })

  app.delete('/customer/:id', function(req, res, next) {
    Customer.findById(req.params.id, function(err, customer) {
      if (err) return next(err)

      customer.remove(function(err) {
        if (err) return next(err)

        return res.send(true)
      })
    })
  })
}
