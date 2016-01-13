import Ember from 'ember'
import DS    from 'ember-data'

export default DS.Transform.extend({
  deserialize(serialized) {
    return Ember.Object.create(serialized)
  }

, serialize(deserialized) {
    return deserialized
  }
})
