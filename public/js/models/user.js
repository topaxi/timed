define(['backbone'], function(Backbone) { 'use strict'
  var User = Backbone.Model.extend({
      'url': function() {
               var url = '/user'

               if (this.id) url += '/'+ this.id

               return url
             }
    , 'idAttribute': '_id'
  })

  return User
})
