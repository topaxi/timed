define(['backbone'], function(Backbone) { 'use strict'
  var Trackbar = Backbone.View.extend({
      'events':     { 'click .attendance .btn': 'attendance' }
    , 'el':         $('#trackbar')
    , 'attendance': function(e) {
                      var $button = $(e.currentTarget)
                        , user    = this.model
                        , $icon   = $button.find('i')

                      if ($icon.is('.icon-play')) {
                        user.get('attendances').push({ 'from': new Date
                                                     , 'to':   null
                                                     })

                        user.save()

                        $icon.removeClass('icon-play').addClass('icon-stop')
                      }
                      else {
                        var attendances = user.get('attendances')
                          , attendance  = attendances[attendances.length - 1]

                        attendance.to = new Date
                        user.save()

                        $icon.removeClass('icon-stop').addClass('icon-play')
                      }

                      this.render()
                    }
    , 'render':     function() {
                      var user        = this.model
                        , $el         = this.$el
                        , attendances = this.model.get('attendances')
                        , attendance  = attendances[attendances.length - 1]

                      if (!attendance) return

                      this.$el.find('.from').text(formatTime(attendance.from))

                      if (attendance.to) {
                        this.$el.find('.to').text(formatTime(attendance.to))
                      }
                      else {
                        var now  = Date.now()
                          , diff = now - attendance.from

                        this.$el.find('.to').text(formatDiff(diff))
                        this.$el.find('.attendance').find('.icon-play')
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
