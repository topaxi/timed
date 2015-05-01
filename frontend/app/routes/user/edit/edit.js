import Ember from 'ember'

export default Ember.Route.extend({
  rollback: function() {
    this.modelFor('user.edit').rollback()
  }.on('deactivate')
})
