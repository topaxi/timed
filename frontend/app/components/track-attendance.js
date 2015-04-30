import Ember  from 'ember'
import moment from 'moment'

const { computed, observer } = Ember

export default Ember.Component.extend({
  tagName: 'span'

, attendance: computed.alias('session.user.currentAttendance')

, title: computed('isTracking', {
    get() {
      return this.get('isTracking') ? 'Stop tracking attendance' : 'Track attendance'
    }
  })

, label: computed('attendance.from', 'attendance.to', 'refreshLabel', {
    get() {
      let attendance = this.get('attendance')

      if (!attendance) {
        return ''
      }

      let from      = attendance.get('from')
      let to        = attendance.get('to')
      let today     = moment().startOf('day')
      let fromToday = moment(from).startOf('day').diff(today)
      let tformat   = 'hh:mm'
      let ntformat  = 'YYYY-MM-DD hh:mm'
      let label     = from.format(fromToday ? ntformat : tformat)

      if (to && to.isValid()) {
        let toToday = moment(to).startOf('day').diff(today)

        label = `${label} - ${to.format(toToday ? ntformat : tformat)}`
      }
      else {
        label = `${label} - <span data-from-now="true" data-from="${from}">${from.fromNow(true)}</span>`
        label = new Ember.Handlebars.SafeString(label)
      }

      return label
    }
  })

, fixTooltip: observer('title', function() {
    let tooltip = this.$('.tip')

    tooltip.prop('title', this.get('title'))
    tooltip.tooltip('fixTitle')

    if (tooltip.is(':hover')) {
      tooltip.tooltip('show')
    }
  })

, isTracking: computed('attendance.to', {
    get() {
      let to = this.get('attendance.to')

      return to && !to.isValid()
    }
  })

, actions: {
    track() {
      let user = this.get('session.user')

      let attendance = this.get('isTracking') ?
        user.endCurrentAttendance() :
        user.startAttendance()

      attendance.save()
    }
  }
})
