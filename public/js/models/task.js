define(['backbone', 'moment'], function(Backbone, moment) {
  'use strict';

  var Task = Backbone.Model.extend({
      'url':         function() {
                       var url = '/task'

                       if (this.id) url += '/'+ this.id

                       return url
                     }
    , 'idAttribute': '_id'
    , 'initialize': function() {
        this.attributes.from = moment(this.attributes.from)
        this.attributes.to   = moment(this.attributes.to)
      }
  })

  return Task
})
