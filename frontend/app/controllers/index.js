import Ember  from 'ember'
import moment from 'moment'

export default Ember.Controller.extend({
  queryParams: [ { 'dateString': 'day' } ]

, day: function(key, value) {
    if (arguments.length === 2) {
      this.set('dateString', value.format('YYYY-MM-DD'))

      return value
    }

    return moment(this.get('dateString'), 'YYYY-MM-DD')
  }.property('dateString')
})
