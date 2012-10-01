define(['backbone', 'collections/project', 'collections/attendance'],
    function(Backbone, Projects, Attendances) {
  'use strict'

  var User = Backbone.Model.extend({
      'defaults': { 'projects': [] }
    , 'url': function() {
               var url = '/user'

               if (this.id) url += '/'+ this.id

               return url
             }
    , 'idAttribute': '_id'
    , 'initialize': function() {
        var attendances = new Attendances(this.get('attendances'))

        attendances.user = this

        this.set('attendances', attendances)
      }
    , 'parse': function(res) {
                 res.attendances = new Attendances(res.attendances)
                 res.attendances.user = this

                 return res
               }
    , 'startAttendance': function(from, to, activities) {
        var attendance = { 'from':       from       || new Date
                         , 'to':         to         || null
                         , 'activities': activities || []
                         }

        return this.get('attendances').create(attendance)
      }
    , 'endCurrentAttendance': function(to) {
        this.endCurrentActivity()
        this.get('attendances').last().end()
      }
    , 'getCurrentAttendance': function() {
        return this.get('attendances').last()
      }
    , 'startActivity': function(task, from, to) {
        this.endCurrentActivity()

        var attendance = this.getCurrentAttendance()
          , activity   = { 'from': from || new Date
                         , 'to':   to   || null
                         , 'task': task && task.id || task || null
                         }

        if (!attendance || attendance.get('to')) {
          attendance = this.startAttendance(from)
        }

        attendance.get('activities').create(activity)
      }
    , 'endCurrentActivity': function() {
        var activity = this.getCurrentActivity()

        if (activity) {
          activity.end()
        }
     }
    , 'getCurrentActivity': function() {
        var attendance = this.get('attendances').last()

        if (!attendance) return

        return attendance.get('activities').last()
      }
  })

  function convertDates(a) {
    var parsed

    parsed = Date.parse(a.from)
    a.from = parsed ? new Date(parsed) : null

    parsed = Date.parse(a.to)
    a.to   = parsed ? new Date(parsed) : null
  }

  return User
})
