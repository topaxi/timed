import Ember  from 'ember'
import DS     from 'ember-data'
import moment from 'moment'
import Model  from './model'

export default Model.extend({
  'name':        DS.attr('string')
, 'firstName':   DS.attr('string', { 'defaultValue': '' })
, 'lastName':    DS.attr('string', { 'defaultValue': '' })
, 'password':    DS.attr('string')
, 'worktime':    DS.attr('any', { 'defaultValue': {} })

, 'projects':    DS.hasMany('project',    { 'async': true })
, 'teams':       DS.hasMany('team',       { 'async': true, 'inverse': 'users' })
, 'assignments': DS.hasMany('assignment', { 'async': true })
, 'attendances': DS.hasMany('attendance', { 'async': true })

, 'attendancesSortingDesc': [ 'from:desc' ]
, 'sortedAttendances': Ember.computed.sort('attendances', 'attendancesSortingDesc')

, 'fullName': function() {
    return `${this.get('firstName')} ${this.get('lastName')}`.trim()
  }.property('firstName', 'lastName')

, 'longName': function() {
    if (!this.get('fullName')) {
      return this.get('name')
    }

    return `${this.get('fullName')} (${this.get('name')})`.trim()
  }.property('name', 'fullName')

, 'currentAttendance': function() {
    return this.get('sortedAttendances').find(attendance =>
      !moment(attendance.get('to')).isValid()
    )
  }.property('sortedAttendances')

, 'currentActivity': function() {
    var attendance = this.get('currentAttendance')

    return attendance ? attendance.get('activities').get('lastObject') : null
  }.property('currentAttendance.activities')

, 'currentAssignments': function() {
    return this.getAssignmentsByWeek()
  }.property('assignments.@each.from', 'assignments.@each.to')

, 'startAttendance': function(from = moment(), to = null) {
    var attendance = this.store.createRecord('attendance', {
      'user': this
    , from
    , to
    })

    return attendance
  }

, 'startActivity': function(task = null, from = moment(), to = null) {
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

, 'endCurrentAttendance': function() {
    var attendance = this.get('currentAttendance')

    if (attendance) {
      this.endCurrentActivity()
      attendance.end()
    }

    return attendance
  }

, 'endCurrentActivity': function() {
    var activity = this.get('currentActivity')

    if (activity) {
      activity.end()
    }

    return activity
  }

, 'getAttendancesByDay': function(day = moment().startOf('day')) {
    return this.get('attendances').filter(attendance =>
      !moment(attendance.get('from')).startOf('day').diff(day)
    )
  }

, 'getAssignmentsByWeek': function(day = moment()) {
    return this.get('assignments').filter(assignment => {
      var from = moment(assignment.get('from'))
      var to   = moment(assignment.get('to'))

      return day.within(moment.range(from.startOf('week'), to.endOf('week')))
    })
  }
})
