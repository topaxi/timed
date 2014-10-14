import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller, project) {
    this.controllerFor('project.edit').setProperties({ 'isNew': true, 'model': project })
  }
, model: function() {
    return this.store.createRecord('project')
  }
, renderTemplate: function() {
    this.render('project/edit')
  }
, deactivate: function() {
    this.controllerFor('project.edit').model.rollback()
  }
})
