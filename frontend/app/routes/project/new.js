import Ember from 'ember'

export default Ember.Route.extend({
  setupController(controller, model) {
    this.controllerFor('project.edit.edit').setProperties({ isNew: true, model })
  }
, model() {
    return this.store.createRecord('project')
  }
, renderTemplate() {
    this.render('project/edit/edit')
  }
, rollback: function() {
    this.controllerFor('project.edit.edit').get('model').rollback()
  }.on('deactivate')
})
