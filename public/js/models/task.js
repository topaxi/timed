define(['backbone'], function(Backbone) { 'use strict';
  var Task = Backbone.Model.extend({
      'url':         function() {
                       var url = '/task'

                       if (this.id) url += '/'+ this.id

                       return url
                     }
    , 'idAttribute': '_id'
  })

  return Task
})
