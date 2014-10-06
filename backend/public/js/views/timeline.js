define(['backbone', 'moment'], function(Backbone, moment) {
  'use strict';

  var Timeline = Backbone.View.extend({
      'tagName':   'ul'
    , 'className': 'timeline'
    //, 'events':    { 'click .day': 'selectDay' }
    , 'render': function() {
        this.$el.empty().appendTo('#timeline')

        var day         = moment().startOf('day')
          , now         = moment()
          , attendances = this.model.get('attendances')
          , worktime    = this.model.get('worktime')
          , currentWorktime

        // TODO: Endless scrolling in both directions!
        for (var i = 0, l = moment().daysInMonth(); i < l; ++i, day.date(day.date() - 1)) {
          var $li        = $('<li>')
            , $time
            , attendance = 0
            , activities = []
            , activity   = 0

          currentWorktime = (worktime[day.format('YYYY-MM-DD')] || 0) * 60

          /*jshint loopfunc:true */
          attendance = ~~attendances.reduce(function(a, b) {
            var from = b.get('from')

            if (!compareDate(day, from)) {
              return a
            }

            b.get('activities').forEach(function(activity) {
              activities.push(activity)
            })

            return a + (b.get('to') || now) - from
          }, 0)
          attendance /= 1000 * 60

          /*jshint loopfunc:true */
          activity = ~~activities.reduce(function(a, b) {
            var from = b.get('from')

            if (!compareDate(day, from)) {
              return a
            }

            return a + (b.get('to') || now) - from
          }, 0)
          activity /= 1000 * 60

          $li.attr('data-date', day.toJSON()).text(day.format('ddd'))

          $li.append($('<div class="attendance">').attr('data-minutes', attendance)
                                                  .width(attendance / currentWorktime * 100 +'%'))

          $time = $('<div class="activity">')
          $time.attr('data-minutes', activity)
               .width(activity / currentWorktime * 100 +'%')

          if (activity > currentWorktime + 60) $time.addClass('overtime')
          if (activity < currentWorktime)      $time.addClass('undertime')

          $li.append($time)
          if (currentWorktime) $li.append('<div class="worktime">')

          this.$el.append($li)
        }
      }
  })

  function compareDate(a, b) {
    if (!b) return false

    return a.date() == b.date() && a.month() == b.month() &&
           a.year() == b.year()
  }

  return Timeline
})
