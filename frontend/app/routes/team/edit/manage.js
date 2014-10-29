import Ember from 'ember';

export default Ember.Route.extend({
  'afterModel': function() {
    return Ember.RSVP.all([
      this.store.find('user')       // TODO: Only get users of the current team.
    , this.store.find('project')
    , this.store.find('assignment') // TODO: Only get assignments of the current users.
    ])
  }
})
