import Ember from 'ember'

const { computed } = Ember

export default Ember.Component.extend({
  labelId: computed('elementId', function() {
    return `input-${this.elementId}`
  })
})
