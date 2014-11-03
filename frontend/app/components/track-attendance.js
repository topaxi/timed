import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
  tagName: 'span'
, init: function() {
    this._super()
    this.session = this.container.lookup('simple-auth-session:main')
  }
, title: function() {
    return this.get('isTracking') ? 'Stop tracking attendance' : 'Track attendance'
  }.property('isTracking')
, label: function() {
    var attendance = this.session.get('user.currentAttendance')

    if (!attendance) {
      return ''
    }

    var from      = attendance.get('from')
      , to        = attendance.get('to')
      , today     = moment().startOf('day')
      , fromToday = moment(from).startOf('day').diff(today)
      , tformat   = 'hh:mm'
      , ntformat  = 'YYYY-MM-DD hh:mm'
      , label     = from.format(fromToday ? ntformat : tformat)

    if (to && to.isValid()) {
      var toToday = moment(to).startOf('day').diff(today)

      label = `${label} - ${to.format(toToday ? ntformat : tformat)}`
    }
    else {
      label = `${label} - <span data-from-now="true" data-from="${from}">${from.fromNow(true)}</span>`
      label = new Ember.Handlebars.SafeString(label)
    }

    return label
  }.property('session.user.currentAttendance.from', 'session.user.currentAttendance.to', 'refreshLabel')
, fixTooltip: function() {
    var tooltip = this.$('.tip')

    tooltip.prop('title', this.get('title'))
    tooltip.tooltip('fixTitle')

    if (tooltip.is(':hover')) {
      tooltip.tooltip('show')
    }
  }.observes('title')
, isTracking: function() {
    var attendance = this.session.get('user.currentAttendance')
      , to         = attendance && attendance.get('to')

    return to && !to.isValid()
  }.property('session.user.currentAttendance.to')
, actions: {
    track: function() {
      this.session.get('user').then(user => {
        var attendance = this.get('isTracking') ?
          user.endCurrentAttendance() :
          user.startAttendance()

        attendance.save()
      })
    }
  }
})
