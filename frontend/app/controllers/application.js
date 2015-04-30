import Ember from 'ember'

const { computed } = Ember

export default Ember.Controller.extend({
  app: computed(function() {
    return Ember.libraries._registry.find(lib => lib.name === 'Timed')
  })
})
