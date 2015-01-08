import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller, task) {
    this.controllerFor('task.edit').setProperties({ 'isNew': true, 'model': task })
  }
, model: function() {
    return this.store.createRecord('task', { 'project': this.modelFor('project.edit') })
  }
, renderTemplate: function() {
    this.render('task/edit')
  }
, rollback: function() {
    this.controllerFor('task.edit').get('model').rollback()
  }.on('deactivate')
})
