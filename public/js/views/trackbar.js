define(['backbone', 'moment'], function(Backbone, moment) { 'use strict'
  var Trackbar = Backbone.View.extend({
      'events':     { 'click .attendance .btn': 'attendance'
                    , 'click .activity .btn':   'activity'
                    }
    , 'el':         $('#trackbar')
    , 'attendance': function(e) {
                      var $button = $(e.currentTarget)
                        , user    = this.model
                        , $icon   = $button.find('i')

                      if ($icon.is('.icon-play')) {
                        user.startAttendance()

                        user.save()

                        $icon.removeClass('icon-play').addClass('icon-stop')
                      }
                      else {
                        user.endCurrentAttendance()

                        user.save()

                        $icon.removeClass('icon-stop').addClass('icon-play')
                      }

                      this.render()
                    }
    , 'activity':   function(e) {
                      var $button = $(e.currentTarget)
                        , user    = this.model
                        , $icon   = $button.find('i')

                      if ($icon.is('.icon-play')) {
                        user.startActivity(user.getCurrentActivity().task)

                        user.save()

                        $icon.removeClass('icon-play').addClass('icon-stop')
                      }
                      else {
                        user.endCurrentActivity()

                        user.save()

                        $icon.removeClass('icon-stop').addClass('icon-play')
                      }

                      this.render()
                    }
    , 'render':     function() {
                      var user        = this.model
                        , $el         = this.$el
                        , $attendance = $el.find('.attendance')
                        , $activity   = $el.find('.activity')
                        , attendance  = user.getCurrentAttendance()
                        , activity    = user.getCurrentActivity()
                        , to

                      if (!attendance) return

                      $attendance.find('.from').text(format(attendance.get('from')))

                      to = attendance.get('to')
                      if (to) {
                        $attendance.find('.to').text(format(to))
                        $attendance.find('.icon-stop')
                                   .removeClass('icon-stop')
                                   .addClass('icon-play')
                      }
                      else {
                        $attendance.find('.to').text(attendance.get('from').fromNow(true))
                        $attendance.find('.icon-play')
                                   .removeClass('icon-play')
                                   .addClass('icon-stop')
                      }

                      if (!activity) return

                      //$activity.find('.name').text(activity.get('task').get('name'))
                      $activity.find('.from').text(format(activity.get('from')))

                      to = activity.get('to')
                      if (to) {
                        $activity.find('.to').text(format(to))
                        $activity.find('.icon-stop')
                                 .removeClass('icon-stop')
                                 .addClass('icon-play')
                      }
                      else {
                        $activity.find('.to').text(activity.get('from').fromNow(true))
                        $activity.find('.icon-play')
                                 .removeClass('icon-play')
                                 .addClass('icon-stop')
                      }
                    }
  })

  function format(date) {
    return date.format(date > today() ? 'LT' : 'LLL')
  }

  function today() {
    var date = new Date

    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)

    return date
  }

  return Trackbar
})
