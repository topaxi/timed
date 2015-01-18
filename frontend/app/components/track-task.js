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
        var activity
        var bugworkaround

        if (this.get('isTracking')) {
          activity = user.endCurrentActivity()
        }
        else {
          bugworkaround = true
          activity      = user.startActivity(this.get('task'))
        }

        activity.get('attendance').save().then(() => {
          // Remove record, ember-data has a bug which duplicates
          // embedded records on saving the parent record, as it
          // does not know how to map the new record.
          // See https://github.com/emberjs/data/issues/1829
          if (bugworkaround) {
            activity.deleteRecord()
          }
        })
      })
    }
  }
})
