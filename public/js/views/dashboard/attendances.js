define(['backbone', 'collections/task', 'moment'],
    function(Backbone, Tasks, moment) {
  'use strict';

  var DashboardAttendancesView = Backbone.View.extend({
      'tagName':   'div'
    , 'className': 'attendances span5'
    , 'events':    { 'click .attendance > .edit': 'editAttendance'
                   }
    , 'editAttendance': function(e) {
        require(['models/attendance', 'views/attendance/edit'],
            function(Attendance, AttendanceEdit) {
          var model = $(e.currentTarget).data('model') || new Attendance
            , view  = new AttendanceEdit({ 'model': model })

          view.render()
        })
      }
    , 'render': function() {
        var attendances = Timed.user.getAttendancesByDay()
          , $el         = this.$el
          , tasks       = new Tasks

        tasks.user = Timed.user
        // TODO: Get rid of this "polling"
        tasks.fetch({ 'success': function() {
          $el.empty()

          if (attendances.length) {
            var $list           = $('<ul>')
              , totalAttendance = 0
              , totalActivity   = 0

            attendances.forEach(function(attendance) {
              var $li        = $('<li class="attendance">')
                , activities = attendance.get('activities')
                , to         = attendance.get('to')
                , from       = attendance.get('from')
                , title      = [ from.format('LT')
                               , to ? to.format('LT') : from.fromNow(true)
                               ].join(' - ')

              totalAttendance += (to || moment()).diff(from, 'minutes')

              $li.text(title).prepend(createEditAttendanceButton(attendance))

              if (activities.length) {
                var $activityList = $('<ul>')

                activities.forEach(function(activity) {
                  var to         = activity.get('to')
                    , from       = activity.get('from')
                    , title      = [ from.format('LT')
                                   , to ? to.format('LT') : from.fromNow(true)
                                   , activity.get('task') ?
                                       tasks.get(activity.get('task')).get('name') :
                                       '<a>Set task</a>'
                                   ].join(' - ')

                  totalActivity += (to || moment()).diff(from, 'minutes')

                  $activityList.append($('<li>').html(title))
                })

                $li.append($activityList)
              }

              $list.append($li)
            })

            $el.append('<h3>Todays attendances</h3>')
            $el.append('<div>Attendance: '+ moment.duration(totalAttendance, 'minutes').humanize())
            $el.append('<div>Activity: '+ moment.duration(totalActivity, 'minutes').humanize())
            $el.append($list)
          }
        } })
      }
  })

  function createEditAttendanceButton(model) {
    return $('<a class="btn btn-small edit mrs" data-placement="left" title="Edit attendance" rel="tooltip"><i class="icon-edit"></i></a>').data('model', model).tooltip()
  }

  return DashboardAttendancesView
})
