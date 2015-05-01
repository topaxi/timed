import Ember  from 'ember'
import DS     from 'ember-data'
import moment from 'moment'
import Model  from './model'

const { computed } = Ember
const { attr, belongsTo, hasMany } = DS

export default Model.extend({
  from:     attr('moment')
, to:       attr('moment')
, duration: attr('number')
, user:     belongsTo('user',    { async: true })
, project:  belongsTo('project', { async: true })
, tasks:    hasMany('tasks',     { async: true })

, potentialWorktime: computed('from', 'to', 'user.worktime', {
    get() {
      let worktime     = 0
      let userWorktime = this.get('user.worktime')

      moment.range(this.get('from'), this.get('to')).by('days', day => {
        worktime += userWorktime[day.format('YYYY-MM-DD')] || 0
      })

      return worktime
    }
  })
})
