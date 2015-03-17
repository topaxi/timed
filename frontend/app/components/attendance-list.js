import Ember from 'ember'

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

, actions: {
    openModal(...args) {
      this.sendAction('openModal', ...args)
    }
  }
})
