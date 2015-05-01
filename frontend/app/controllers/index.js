import Ember  from 'ember'
import moment from 'moment'

const { computed } = Ember

export default Ember.Controller.extend({
  queryParams: [ { dateString: 'day' } ]

, day: computed('dateString', {
    set(key, newValue/*, oldValue*/) {
      this.set('dateString', newValue.format('YYYY-MM-DD'))

      return newValue
    }
  , get() {
      return moment(this.get('dateString'), 'YYYY-MM-DD')
    }
  })
})
