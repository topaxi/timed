import Ember from 'ember';

export default Ember.Route.extend({
  'afterModel': function() {
    return Ember.RSVP.all([
      this.store.find('user') // TODO: Only get users of the current team.
    , this.store.find('project')
    ])
  }
})
