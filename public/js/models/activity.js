define(['backbone', 'models/task', 'moment'], function(Backbone, Task, moment) {
  'use strict';

  var Activity = Backbone.Model.extend({
      'idAttribute': '_id'
    , 'sync': function() { return false }
    , 'initialize': function() {
        this.attributes.from = moment(this.attributes.from)
        this.attributes.to   = moment(this.attributes.to)
      }
    , 'end': function(to) {
        to = to || this.get('to')
        this.set('to', to || moment())
      }
  })

  function convertDates(a) {
    a.from = moment(a.from)
    a.to   = moment(a.to)
  }

  return Activity
})
