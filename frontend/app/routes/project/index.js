import Ember from 'ember'

export default Ember.Route.extend({
  beforeModel() {
    return Ember.RSVP.all([
      this.store.find('project')
    , this.store.find('customer')
    ])
  }

, model() {
    return this.store.all('project')
  }
})
