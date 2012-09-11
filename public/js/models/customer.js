define(['backbone'], function(Backbone) { 'use strict'
  var Customer = Backbone.Model.extend({
      'url':         function() {
                       var url = '/customer'

                       if (this.id) url += '/'+ this.id

                       return url
                     }
    , 'idAttribute': '_id'
  })

  return Customer
})
