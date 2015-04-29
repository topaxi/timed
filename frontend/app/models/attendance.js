import DS     from 'ember-data'
import moment from 'moment'
import Model  from './model'

export default Model.extend({
  'user':       DS.belongsTo('user', { 'async': true })
, 'activities': DS.hasMany('activity')
, 'from':       DS.attr('moment')
, 'to':         DS.attr('moment')

, 'end': function() {
    this.set('to', moment())

    return this
  }
, 'activityDuration': function() {
    return moment.duration(this.get('activities').reduce((duration, activity) => {
      let to = Number(activity.get('to')) || moment()
      let from = Number(activity.get('from')) || to
      return duration + (to - from)
    }, 0)).format('h[h] mm[m]')
  }.property('activities.@each.from', 'activities.@each.to')
})
