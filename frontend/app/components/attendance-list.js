import Ember from 'ember'
import moment from 'moment'

export default Ember.Component.extend({
  day: null

, attendances: function() {
    let user = this.get('user')

    if (!user) {
      return []
    }

    return user.getAttendancesByDay(this.get('day'))
               .sort((a, b) => b.get('from').diff(a.get('from')))
  }.property('day', 'user.attendances.@each')

, totalDuration: function() {
    return moment.duration(this.get('attendances').reduce((duration, attendance) => {
      return duration + attendance.get('to') - attendance.get('from')
    }, 0)).format('h[h] mm[m]')
  }.property('attendances.@each.from', 'attendances.@each.to')

, actions: {
    openModal(...args) {
      this.sendAction('openModal', ...args)
    }
  }
})
