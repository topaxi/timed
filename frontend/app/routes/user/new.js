import ProtectedRoute from 'timed/routes/protected';

export default ProtectedRoute.extend({
  setupController: function(controller, user) {
    this.controllerFor('user.edit').setProperties({ 'isNew': true, 'model': user })
  }
, model: function() {
    return this.store.createRecord('user')
  }
, renderTemplate: function() {
    this.render('user/edit')
  }
, deactivate: function() {
    this.controllerFor('user.edit').model.rollback()
  }
})
