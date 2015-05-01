import Ember from 'ember'

export default Ember.Route.extend({
  setupController(controller, model) {
    this.controllerFor('customer.edit').setProperties({ isNew: true, model })
  }
, model() {
    return this.store.createRecord('customer')
  }
, renderTemplate() {
    this.render('customer/edit')
  }
, rollback: function() {
    this.controllerFor('customer.edit').get('model').rollback()
  }.on('deactivate')
})
