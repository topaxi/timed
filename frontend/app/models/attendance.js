import Ember  from 'ember'
import DS     from 'ember-data'
import moment from 'moment'
import Model  from './model'

const { computed } = Ember
const { attr, belongsTo, hasMany } = DS

export default Model.extend({
  user:       belongsTo('user', { async: true })
, activities: hasMany('activity')
, from:       attr('moment')
, to:         attr('moment')

, end() {
    this.set('to', moment())

    return this
  }

, activityDuration: computed('activities.@each.from', 'activities.@each.to', {
    get() {
      return moment.duration(this.get('activities').reduce((duration, activity) => {
        let to = Number(activity.get('to')) || moment()
        let from = Number(activity.get('from')) || to
        return duration + (to - from)
      }, 0)).format('h[h] mm[m]')
    }
  })
})
