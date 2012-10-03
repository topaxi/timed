define(['backbone'], function(Backbone) { 'use strict';
  var days = [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ]

  var Timeline = Backbone.View.extend({
      tagName:   'ul'
    , className: 'timeline'
    //, events:    { 'click .day': 'selectDay' }
    , render:    function() {
                   this.$el.appendTo('#timeline')

                   var now         = new Date
                     , attendances = this.model.get('attendances')

                   now.setMilliseconds(0)
                   now.setSeconds(0)
                   now.setMinutes(0)
                   now.setHours(0)

                   for (var i = 0, l = 30; i < l; ++i) {
                     var $li   = $('<li>')
                       , width = 0

                     now.setDate(now.getDate() - 1)

                     width = attendances.reduce(function(a, b) {
                       //console.log(a, b)
                       if (!compareDate(now, Timed.parseDate(b.from))) {
                         return a
                       }

                       return a + (b.to - b.from) / 1000 / 60
                     }, 0)

                     //console.log(width)

                     $li.text(days[now.getDay()])

                     this.$el.append($li)
                   }
                 }
  })

  function compareDate(a, b) {
    return a.getDate() == b.getDate() && a.getMonth() == b.getMonth() &&
           a.getFullYear() == b.getFullYear()
  }

  return Timeline
})
