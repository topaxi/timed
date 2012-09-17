define(['backbone', 'models/activity'], function(Backbone, Activity) {
  'use strict'

  var Activities = Backbone.Collection.extend({
      'model': Activity
    , 'sync': function() { return false }
    , 'initialize': function() {
        var attendance = this.attendance

        //this.on('all', function(event) {
        //  attendance.trigger(event)
        //})
      }
  })

  return Activities
})
