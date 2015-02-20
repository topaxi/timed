import Ember from 'ember';

export default Ember.Component.extend({
  elementId:  'track-bar'
, classNames: 'container'

, activity: Ember.computed.alias('user.currentActivity')
, task:     Ember.computed.alias('activity.task')

, showCommentField: function() {
    let activity = this.get('activity')

    if (!activity) {
      return false
    }

    let to         = activity.get('to')
    let isTracking = !to || !to.isValid()
    let hasTask    = this.get('task.content')

    return isTracking || hasTask
  }.property('activity.to', 'task')

, actions: {
    startNewActivity() {
      this.get('user').then(user =>
        user.startActivity().save()
      )
    }
  , setActivityComment(value) {
      var activity = this.get('activity')

      activity.set('comment', value)
      activity.save()
    }
  }
})
