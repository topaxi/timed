import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span'

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
    var activity = this.get('session.user.currentActivity')

    if (activity && activity.get('task.id') === this.get('task.id')) {
      var to = activity.get('to')

      return to && !to.isValid()
    }

    return false
  }.property('task.id', 'session.user.currentActivity.to')

, actions: {
    track() {
      this.get('session.user').then(user => {
        var activity

        if (this.get('isTracking')) {
          activity = user.endCurrentActivity()
        }
        else {
          activity = user.startActivity(this.get('task'))
        }

        activity.save()
      })
    }
  }
})
