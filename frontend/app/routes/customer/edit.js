import Ember from 'ember';

export default Ember.Route.extend({
  rollback: function() {
    this.modelFor('customer.edit').rollback()
  }.on('deactivate')
})
