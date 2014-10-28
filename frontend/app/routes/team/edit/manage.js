import Ember from 'ember';

export default Ember.Route.extend({
  'afterModel': function() {
    // TODO: Only get users of the current team.
    return this.store.find('user')
  }
})
