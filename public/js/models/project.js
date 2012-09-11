define(['backbone'], function(Backbone) { 'use strict'
  var Project = Backbone.Model.extend({
      'url':         function() {
                       var url = '/project'

                       if (this.id) url += '/'+ this.id

                       return url
                     }
    , 'idAttribute': '_id'
  })

  return Project
})
