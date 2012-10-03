define(['backbone', 'collections/activity', 'moment'],
    function(Backbone, Activities, moment) {
  'use strict';

  var Attendance = Backbone.Model.extend({
      'idAttribute': '_id'
    , 'sync': function() { return false }
    , 'initialize': function() {
                 var attributes = this.attributes

                 attributes.from = moment(attributes.from)
                 attributes.to   = moment(attributes.to)

                 attributes.activities = new Activities(attributes.activities)
                 attributes.activities.attendance = this
               }
    , 'end': function(to) {
        to = to || this.get('to')
        this.set('to', to || moment())
      }
  })

  return Attendance
})
