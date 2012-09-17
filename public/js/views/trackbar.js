define(['backbone'], function(Backbone) { 'use strict'
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

                      if (!attendance) return

                      $attendance.find('.from').text(formatTime(attendance.get('from')))

                      if (attendance.get('to')) {
                        $attendance.find('.to').text(formatTime(attendance.get('to')))
                        $attendance.find('.icon-stop')
                                   .removeClass('icon-stop')
                                   .addClass('icon-play')
                      }
                      else {
                        var now  = Date.now()
                          , diff = now - attendance.get('from')

                        $attendance.find('.to').text(formatDiff(diff))
                        $attendance.find('.icon-play')
                                   .removeClass('icon-play')
                                   .addClass('icon-stop')
                      }

                      if (!activity) return

                      //$activity.find('.name').text(activity.get('task').get('name'))
                      $activity.find('.from').text(formatTime(activity.get('from')))

                      if (activity.get('to')) {
                        $activity.find('.to').text(formatTime(activity.get('to')))
                        $activity.find('.icon-stop')
                                 .removeClass('icon-stop')
                                 .addClass('icon-play')
                      }
                      else {
                        var now  = Date.now()
                          , diff = now - activity.get('from')

                        $activity.find('.to').text(formatDiff(diff))
                        $activity.find('.icon-play')
                                 .removeClass('icon-play')
                                 .addClass('icon-stop')
                      }
                    }
  })

  function formatDiff(diff) {
    return Math.round(diff / 1000 / 60) +'m'
  }

  function formatTime(date) {
    if (date > today()) {
      return Timed.formatTime(date)
    }

    return Timed.formatDateTime(date)
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
