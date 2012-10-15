define(['backbone', 'moment'], function(Backbone, moment) {
  'use strict';

  // TODO: This shouldn't be hardcoded!
  var workTime = 8 * 60
  var Timeline = Backbone.View.extend({
      'tagName':   'ul'
    , 'className': 'timeline'
    //, 'events':    { 'click .day': 'selectDay' }
    , 'render': function() {
        this.$el.empty().appendTo('#timeline')

        var day         = moment().startOf('day')
          , now         = moment()
          , attendances = this.model.get('attendances')

        // TODO: Endless scrolling in both directions!
        for (var i = 0, l = moment().daysInMonth(); i < l; ++i, day.date(day.date() - 1)) {
          var $li        = $('<li>')
            , $time
            , attendance = 0
            , activities = []
            , activity   = 0

          /*jshint loopfunc:true */
          attendance = ~~attendances.reduce(function(a, b) {
            var from = b.get('from')

            if (!compareDate(day, from)) {
              return a
            }

            b.get('activities').forEach(function(activity) {
              activities.push(activity)
            })

            return a + ((b.get('to') || now) - from) / 1000 / 60
          }, 0)

          /*jshint loopfunc:true */
          activity = ~~activities.reduce(function(a, b) {
            var from = b.get('from')

            if (!compareDate(day, from)) {
              return a
            }

            return a + ((b.get('to') || now) - from) / 1000 / 60
          }, 0)

          $li.attr('data-date', day.toJSON()).text(day.format('ddd'))

          $li.append($('<div class="attendance">').attr('data-minutes', attendance)
                                                  .width(attendance / workTime * 100 +'%'))

          $time = $('<div class="activity">')
          $time.attr('data-minutes', activity)
               .width(activity / workTime * 100 +'%')

          if (activity > workTime + 60) $time.addClass('overtime')
          if (activity < workTime)      $time.addClass('undertime')

          $li.append($time)
          $li.append('<div class="worktime">')

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
