import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'container'

, task: Ember.computed.alias('user.currentActivity.task')

  // TODO: This seems to fire twice if we start tracking a new task,
  //       we can maybe create our own ember-editable components?
, setupEditableComment: function() {
    var $editable = Ember.$('<a>')

    $editable.editable({
      'placeholder': 'Comment activity'
    , 'emptytext':   'Comment activity'
    , 'value':       this.get('user.currentActivity.comment')
    , 'success': (res, value) => {
        var activity = this.get('user.currentActivity')

        activity.set('comment', value)

        activity.get('attendance').save()
      }
    })

    this.$('.edit-comment').html($editable)
  }.on('didInsertElement').observes('user.currentActivity.comment')

, showCommentField: function() {
    let activity = this.get('user.currentActivity')

    if (!activity) {
      return false
    }

    let to         = activity.get('to')
    let isTracking = !to || !to.isValid()
    let hasTask    = this.get('task.content')

    console.log(to, isTracking, hasTask)

    return isTracking || hasTask
  }.property('user.currentActivity.to', 'task')

, actions: {
    startNewTask() {
      this.get('user').then(user => user.startActivity().save())
    }
  }
})
