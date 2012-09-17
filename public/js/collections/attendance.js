define(['backbone', 'models/attendance'], function(Backbone, Attendance) {
  'use strict'

  var Attendances = Backbone.Collection.extend({
      'model': Attendance
    , 'sync': function() { return false }
    , 'initialize': function() {
        var user = this.user

        //this.on('all', function(event) {
        //  user.trigger(event)
        //})
      }
  })

  return Attendances
})
