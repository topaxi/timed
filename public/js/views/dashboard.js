define(['backbone', 'views/dashboard/project'],
    function(Backbone, DashboardProjectView) {
  'use strict'

  var Dashboard = Backbone.View.extend({
      'events': {}
    , 'el': $('#dashboard')
    , 'render': function() {
        var user        = Timed.user
          , attendances = Timed.user.getAttendancesByDay()
          , $el         = this.$el.empty()

        if (attendances.length) {
          var $list = $('<ul>')

          attendances.forEach(function(attendance) {
            var $li        = $('<li>')
              , activities = attendance.get('activities')
              , to         = attendance.get('to')
              , from       = attendance.get('from')
              , title      = [ from.format('LT')
                             , to ? to.format('LT') : '?'
                             ].join(' - ')

            $li.text(title)

            if (activities.length) {
              var $activityList = $('<ul>')

              activities.forEach(function(activity) {
                var to         = activity.get('to')
                  , from       = activity.get('from')
                  , title      = [ from.format('LT')
                                 , to ? to.format('LT') : '?'
                                 , activity.get('task') || '<a>Set task</a>'
                                 ].join(' - ')

                $activityList.append($('<li>').html(title))
              })

              $li.append($activityList)
            }

            $list.append($li)
          })

          $el.append('<h3>Todays attendances</h3>')
          $el.append($list)
        }

        if (this.projects.length) {
          $el.append('<h3>Your Projects</h3>')

          this.projects.forEach(function(project) {
            var eventView = new DashboardProjectView({ 'model': project })

            eventView.render()

            $el.append(eventView.el)
          })
        }
      }
  })

  return Dashboard
})
