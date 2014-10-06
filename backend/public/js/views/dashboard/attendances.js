define(['backbone', 'collections/task', 'moment'],
    function(Backbone, Tasks, moment) {
  'use strict';

  var DashboardAttendancesView = Backbone.View.extend({
      'tagName':   'div'
    , 'className': 'attendances span5'
    , 'events':    { 'click .attendance > .edit': 'editAttendance'
                   , 'click .add-attendance':     'editAttendance'
                   , 'click .activity > .edit':   'editActivity'
                   , 'click .add-activity':       'editActivity'
                   }
    , 'editAttendance': function(e) {
        require(['models/attendance', 'views/attendance/edit'],
            function(Attendance, AttendanceEdit) {
          // TODO: Probably need to know the current day...
          var model = $(e.currentTarget).closest('attendance').data('model') || new Attendance
            , view  = new AttendanceEdit({ 'model': model })

          view.render()
        })
      }
    , 'editActivity': function(e) {
        var $btn = $(e.target)

        require(['models/activity', 'views/activity/edit'],
            function(Activity, ActivityEdit) {
          var model = $(e.currentTarget).closest('.activity').data('model')
            , view, attendance

          if (!model) {
            model      = new Activity
            attendance = $btn.closest('.attendance').data('model')
          }

          view = new ActivityEdit({ 'model': model, 'attendance': attendance })
          view.render()
        })
      }
    , 'render': function() {
        var attendances = Timed.user.getAttendancesByDay()
          , tasks       = Timed.tasks
          , $el         = this.$el

        $el.empty()

        if (attendances.length) {
          var $list           = $('<ul>')
            , totalAttendance = 0
            , totalActivity   = 0

          attendances.forEach(function(attendance) {
            var $li        = $('<li class="attendance mtl">').data('model', attendance)
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
                var $li   = $('<li class="activity mvs">').data('model', activity)
                  , to    = activity.get('to')
                  , from  = activity.get('from')
                  , title = [ from.format('LT')
                            , to ? to.format('LT') : from.fromNow(true)
                            , activity.get('task') ?
                                tasks.get(activity.get('task')).get('name') :
                                '<span class="text-warning">No task selected!</span>'
                            ].join(' - ')

                totalActivity += (to || moment()).diff(from, 'minutes')

                $activityList.append($li.html(title).prepend(createEditActivityButton(activity)))
              })

              $li.append($activityList)
            }
            // TODO: Maybe add this one before/after the attendance edit button?
            $li.append('<button class="db mts btn add-activity">Add activity</button>')

            $list.append($li)
          })

          $el.append('<h3>Todays attendances</h3>')
          $el.append('<div>Attendance: '+ moment.duration(totalAttendance, 'minutes').humanize())
          $el.append('<div>Activity: '+ moment.duration(totalActivity, 'minutes').humanize())
          $el.append($list)
          $el.append('<button class="db mts btn add-attendance">Add attendance</button>')
        }
      }
  })

  function createEditActivityButton(model) {
    return $('<a class="btn btn-small edit mrs" data-placement="left" title="Edit activity" rel="tooltip"><i class="icon-edit"></i></a>').tooltip()
  }

  function createEditAttendanceButton(model) {
    return $('<a class="btn btn-small edit mrs" data-placement="left" title="Edit attendance" rel="tooltip"><i class="icon-edit"></i></a>').tooltip()
  }

  return DashboardAttendancesView
})
