import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
  tagName: 'span'
, polling: true
, init: function() {
    this._super()
    this.session = this.container.lookup('simple-auth-session:main')

    this.pollLabel()
  }
, title: function() {
    return this.get('isTracking') ? 'Stop tracking attendance' : 'Track attendance'
  }.property('isTracking')
, pollLabel: function() {
    if (this.polling) {
      // Set refresh to NaN as NaN is always unequal to itsef, which will
      // always "change" the refreshLabel property to update the actual label.
      Ember.run.later(() => this.set('refreshLabel', NaN), 5000)
    }
  }.observes('refreshLabel')
, label: function() {
    var attendance = this.session.get('user.currentAttendance')

    if (!attendance) {
      return ''
    }

    var from      = attendance.get('from')
      , to        = attendance.get('to')
      , today     = moment().startOf('day')
      , fromToday = moment(from).startOf('day').diff(today)
      , toToday   = moment(to).startOf('day').diff(today)
      , tformat   = 'hh:mm'
      , ntformat  = 'YYYY-MM-DD hh:mm'
      , label     = from.format(fromToday ? tformat : ntformat)

    if (to && to.isValid()) {
      label = `${label} - ${to.format(toToday ? tformat : ntformat)}`
    }
    else {
      label = `${label} - ${from.fromNow(true)}`
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
        if (this.get('isTracking')) {
          user.endCurrentAttendance()
        }
        else {
          user.startAttendance()
        }

        user.save()
      })
    }
  , willDestroy: function() {
      this.set('polling', false)
    }
  }
})
