import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller, customer) {
    this.controllerFor('customer.edit').setProperties({ 'isNew': true, 'model': customer })
  }
, model: function() {
    return this.store.createRecord('customer')
  }
, renderTemplate: function() {
    this.render('customer/edit')
  }
, rollback: function() {
    this.controllerFor('customer.edit').get('model').rollback()
  }.on('deactivate')
})
