import Ember  from 'ember'
import DS     from 'ember-data'
import moment from 'moment'
import Model  from './model'

const { computed } = Ember
const { attr, hasMany } = DS

export default Model.extend({
  name:        attr('string')
, firstName:   attr('string', { defaultValue: '' })
, lastName:    attr('string', { defaultValue: '' })
, password:    attr('string')
, worktime:    attr('any', { defaultValue: {} })

, projects:    hasMany('project',    { async: true, inverse: null })
, teams:       hasMany('team',       { async: true, inverse: 'users' })
, assignments: hasMany('assignment', { async: true })
, attendances: hasMany('attendance', { async: true })

, attendancesSortingDesc: [ 'from:desc' ]
, sortedAttendances: computed.sort('attendances', 'attendancesSortingDesc')

, fullName: computed('firstName', 'lastName', {
    get() {
      return `${this.get('firstName')} ${this.get('lastName')}`.trim()
    }
  })

, longName: computed('name', 'fullName', {
    get() {
      if (!this.get('fullName')) {
        return this.get('name')
      }

      return `${this.get('fullName')} (${this.get('name')})`.trim()
    }
  })

, currentAttendance: computed('sortedAttendances', {
    get() {
      return this.get('sortedAttendances').find(attendance =>
        !moment(attendance.get('to')).isValid()
      )
    }
  })

, currentActivity: computed('currentAttendance.activities', {
    get() {
      let attendance = this.get('currentAttendance')

      return attendance ? attendance.get('activities').get('lastObject') : null
    }
  })

, currentAssignments: computed('assignments.@each.from', 'assignments.@each.to', {
    get() {
      return this.getAssignmentsByWeek()
    }
  })

, startAttendance(from = moment(), to = null) {
    let attendance = this.store.createRecord('attendance', {
      'user': this
    , from
    , to
    })

    return attendance
  }

, startActivity(task = null, from = moment(), to = null) {
    this.endCurrentActivity()

    let attendance            = this.get('currentAttendance')
    let shouldStartAttendance = () =>
      !attendance ||
      attendance.get('to') &&
      attendance.get('to').isValid()

    if (shouldStartAttendance()) {
      attendance = this.startAttendance(from)
    }

    let activity = this.store.createRecord('activity', {
      attendance
    , task
    , from
    , to
    })

    return activity
  }

, endCurrentAttendance() {
    let attendance = this.get('currentAttendance')

    if (attendance) {
      this.endCurrentActivity()
      attendance.end()
    }

    return attendance
  }

, endCurrentActivity() {
    let activity = this.get('currentActivity')

    if (activity) {
      activity.end()
    }

    return activity
  }

, getAttendancesByDay(day = moment().startOf('day')) {
    return this.get('attendances').filter(attendance =>
      !moment(attendance.get('from')).startOf('day').diff(day)
    )
  }

, getAssignmentsByWeek(day = moment()) {
    return this.get('assignments').filter(assignment => {
      let from = moment(assignment.get('from'))
      let to   = moment(assignment.get('to'))

      return day.within(moment.range(from.startOf('week'), to.endOf('week')))
    })
  }
})
