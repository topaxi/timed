import Ember from 'ember';

export default Ember.ObjectController.extend({
  'init': function() {
    this.set('allTasks',    this.store.find('task'))
    this.set('allProjects', this.store.find('project'))
  }
, 'title': function() {
    var action = this.get('model.isNew') ? 'Add' : 'Edit'
    return `${action} assignment for ${this.get('model.user.longName')}`
  }.property('model.user')
, 'actions': {
    'save': function() {
      this.get('model').save()
    }
  , 'closeModal': function() {
      this.get('model').rollback()

      return true
    }
  }
})
