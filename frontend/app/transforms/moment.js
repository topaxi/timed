import DS from 'ember-data';
import moment from 'moment';

export default DS.Transform.extend({
  serialize: function(value) {
    return value && value.isValid() ? value.toJSON() : null
  }
, deserialize: function(value) {
    return moment(value)
  }
})
