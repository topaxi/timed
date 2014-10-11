import ProtectedRoute from 'timed/routes/protected';

export default ProtectedRoute.extend({
  setupController: function(controller, customer) {
    this.controllerFor('customer.edit').setProperties({ 'isNew': true, 'model': customer })
  }
, model: function() {
    return this.store.createRecord('customer')
  }
, renderTemplate: function() {
    this.render('customer/edit')
  }
, deactivate: function() {
    this.controllerFor('customer.edit').model.rollback()
  }
})
