import Ember from 'ember';

export default Ember.Route.extend({
  afterModel() {
    if (this.session.isAuthenticated) {
      this.replaceWith('/')
    }
  }
})
