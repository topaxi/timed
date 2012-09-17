define(['backbone', 'collections/activity'],
    function(Backbone, Activities) {
  'use strict'

  var Attendance = Backbone.Model.extend({
      'idAttribute': '_id'
    , 'sync': function() { return false }
    , 'initialize': function() {
                 convertDates(this.attributes)

                 this.attributes.activities = new Activities(this.attributes.activities)
                 this.attributes.activities.attendance = this
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

  return Attendance
})
