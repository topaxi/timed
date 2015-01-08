import Ember from 'ember';

export default Ember.Route.extend({
  rollback: function() {
    this.modelFor('task.edit').rollback()
  }.on('deactivate')
})
