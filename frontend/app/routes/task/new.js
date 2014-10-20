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
, deactivate: function() {
    this.modelFor('task.edit').rollback()
  }
})
