define(['backbone', 'models/customer'], function(Backbone, Customer) { 'use strict';
  var Customers = Backbone.Collection.extend({
      'model': Customer
    , 'url':   '/customer'
  })

  return Customers
})
