define(['backbone', 'collections/task', 'moment'],
    function(Backbone, Tasks, moment) {
  'use strict';

  var DashboardAttendancesView = Backbone.View.extend({
      'tagName':   'div'
    , 'className': 'attendances span5'
    , 'render': function() {
        var attendances = Timed.user.getAttendancesByDay()
          , $el         = this.$el
          , tasks       = new Tasks

        tasks.user = Timed.user
        // TODO: Get rid of this "polling"
        tasks.fetch({ 'success': function() {
          $el.empty()

          if (attendances.length) {
            var $list = $('<ul>')

            attendances.forEach(function(attendance) {
              var $li        = $('<li>')
                , activities = attendance.get('activities')
                , to         = attendance.get('to')
                , from       = attendance.get('from')
                , title      = [ from.format('LT')
                               , to ? to.format('LT') : from.fromNow(true)
                               ].join(' - ')

              $li.text(title)

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

                  $activityList.append($('<li>').html(title))
                })

                $li.append($activityList)
              }

              $list.append($li)
            })

            $el.append('<h3>Todays attendances</h3>')
            $el.append($list)
          }
        } })
      }
  })

  return DashboardAttendancesView
})
