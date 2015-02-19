import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'container'
  // TODO: This seems to fire twice if we start tracking a new task,
  //       we can maybe create our own ember-editable components?
, setupEditableComment: function() {
    var $editable = Ember.$('<a>')

    $editable.editable({
      'placeholder': 'Comment activity'
    , 'emptytext':   'Comment activity'
    , 'value':       this.get('session.user.currentActivity.comment')
    , 'success': (res, value) => {
        var activity = this.get('session.user.currentActivity')

        activity.set('comment', value)

        activity.get('attendance').save()
      }
    })

    this.$('.edit-comment').html($editable)
  }.on('didInsertElement').observes('user.currentActivity.comment')
})
