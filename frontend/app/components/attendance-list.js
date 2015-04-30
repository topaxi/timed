import Ember  from 'ember'
import moment from 'moment'

const { computed } = Ember

export default Ember.Component.extend({
  day: null

, attendances: computed('day', 'user.attendances.@each', {
    get() {
      let user = this.get('user')

      if (!user) {
        return []
      }

      return user.getAttendancesByDay(this.get('day'))
                 .sort((a, b) => b.get('from').diff(a.get('from')))
    }
  })

, totalDuration: computed('attendances.@each.from', 'attendances.@each.to', {
    get() {
      return moment.duration(this.get('attendances').reduce((duration, attendance) => {
        return duration + attendance.get('to') - attendance.get('from')
      }, 0)).format('h[h] mm[m]')
    }
  })

, actions: {
    openModal(...args) {
      this.sendAction('openModal', ...args)
    }
  }
})
