define(['backbone', 'moment', 'collections/project', 'collections/attendance'],
    function(Backbone, moment, Projects, Attendances) {
  'use strict';

  var User = Backbone.Model.extend({
      'defaults': { 'projects': [], 'worktime': {} }
    , 'url': function() {
        var url = '/user'

        if (this.id) url += '/'+ this.id

        return url
      }
    , 'idAttribute': '_id'
    , 'initialize': function() {
        var attendances = this.get('attendances')

        if (!(attendances instanceof Attendances)) {
          attendances = new Attendances(attendances)
          attendances.user = this

          this.set('attendances', attendances)
        }
      }
    , 'parse': function(res) {
        res.attendances = new Attendances(res.attendances)
        res.attendances.user = this

        return res
      }
    , 'startAttendance': function(from, to, activities) {
        var attendance = { 'from':       from       || moment()
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
          , activity   = { 'from': from || moment()
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
    , 'getAttendancesByDay': function(day) {
        return this.get('attendances').filter(dayFilter(day))
      }
  })

  function dayFilter(day) {
    day = day || moment()

    return function(a) {
      return !a.get('from').diff(day, 'days')
    }
  }

  return User
})
