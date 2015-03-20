import Ember from 'ember';

export default Ember.Controller.extend({
  'init': function() {
    this.set('allTasks',    this.store.find('task'))
    this.set('allProjects', this.store.find('project'))
  }

, 'title': function() {
    let action = this.get('model.isNew') ? 'Add' : 'Edit'
    let name   = this.get('model.user.longName')

    return `${action} assignment for ${name}`
  }.property('model.user')

, actions: {
    save() {
      this.get('model').save()
    }

  , closeModal() {
      this.get('model').rollback()

      return true
    }
  }
})
