import Ember from 'ember';

export default Ember.Route.extend({
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
    this.modelFor('user.edit').rollback()
  }
})
