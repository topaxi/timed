import Ember from 'ember'

export default Ember.Route.extend({
  setupController(controller, model) {
    this.controllerFor('user.edit.edit').setProperties({ isNew: true, model })
  }
, model() {
    return this.store.createRecord('user')
  }
, renderTemplate() {
    this.render('user/edit/edit')
  }
, rollback: function() {
    this.controllerFor('user.edit.edit').get('model').rollback()
  }.on('deactivate')
})
