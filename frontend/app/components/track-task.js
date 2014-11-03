import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span'
, init: function() {
    this._super()
    this.session = this.container.lookup('simple-auth-session:main')
  }
, title: function() {
    return `${this.get('isTracking') ? 'Stop tracking' : 'Track'} ${this.get('task.name')}`
  }.property('task.name', 'isTracking')
, fixTooltip: function() {
    var tooltip = this.$('.tip')

    tooltip.prop('title', this.get('title'))
    tooltip.tooltip('fixTitle')

    if (tooltip.is(':hover')) {
      tooltip.tooltip('show')
    }
  }.observes('title')
, isTracking: function() {
    var activity = this.session.get('user.currentActivity')

    if (activity && activity.get('task.id') === this.get('task.id')) {
      var to = activity.get('to')

      return to && !to.isValid()
    }

    return false
  }.property('task.id', 'session.user.currentActivity.to')
, actions: {
    track: function() {
      this.session.get('user').then(user => {
        if (this.get('isTracking')) {
          user.endCurrentActivity()
        }
        else {
          user.startActivity(this.get('task'))
        }

        user.get('currentAttendance').save()
      })
    }
  }
})
