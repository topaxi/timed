define(['backbone', 'models/task'], function(Backbone, Task) { 'use strict'
  var Activity = Backbone.Model.extend({
      'idAttribute': '_id'
    , 'sync': function() { return false }
    , 'initialize': function() {
                 convertDates(this.attributes)

                 //this.set('task', new Task({ '_id': this.get('task') }))
               }
    , 'end': function(to) {
        to = to || this.get('to')
        this.set('to', to || new Date)
      }
  })

  function convertDates(a) {
    var parsed

    parsed = Date.parse(a.from)
    a.from = parsed ? new Date(parsed) : null

    parsed = Date.parse(a.to)
    a.to   = parsed ? new Date(parsed) : null
  }

  return Activity
})
