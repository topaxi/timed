import Ember from 'ember';

export default Ember.Controller.extend({
  app: function() {
    return Ember.libraries.find(lib => lib.name === 'Timed')
  }.property()
})
