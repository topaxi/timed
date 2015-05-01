import Ember from 'ember'

export default Ember.Route.extend({
  setupController(controller, model) {
    this.controllerFor('team.edit.edit').setProperties({ isNew: true, model })
  }
, model() {
    return this.store.createRecord('team')
  }
, renderTemplate() {
    this.render('team/edit/edit')
  }
, rollback: function() {
    this.controllerFor('team.edit.edit').get('model').rollback()
  }.on('deactivate')
})
