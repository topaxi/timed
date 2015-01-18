import Ember  from 'ember';
import DS     from 'ember-data';
import moment from 'moment';

export default DS.Model.extend({
  'name':        DS.attr('string')
, 'firstName':   DS.attr('string')
, 'lastName':    DS.attr('string')
, 'password':    DS.attr('string')
, 'worktime':    DS.attr('any', { 'defaultValue': {} })

, 'projects':    DS.hasMany('project',    { 'async': true })
, 'teams':       DS.hasMany('team',       { 'async': true, 'inverse': 'users' })
, 'assignments': DS.hasMany('assignment', { 'async': true })
, 'attendances': DS.hasMany('attendance', { 'async': true })

, 'attendancesSortingDesc': [ 'from:desc' ]
, 'sortedAttendances': Ember.computed.sort('attendances', 'attendancesSortingDesc')

, 'fullName': function() {
    return `${this.get('firstName')||''} ${this.get('lastName')||''}`.trim()
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
    var attendance = this.store.createRecord('attendance', { 'user': this
                                                           , 'from': from
                                                           , 'to':   to
                                                           })

    return attendance
  }

, 'startActivity': function(task, from = moment(), to = null) {
    this.endCurrentActivity()

    var attendance = this.get('currentAttendance')

    if (!attendance || attendance.get('to') && attendance.get('to').isValid()) {
      attendance = this.startAttendance(from)
    }

    var activity = this.store.createRecord('activity', { attendance
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
      var from = moment(assignment.get('from').startOf('week'))
      var to   = moment(assignment.get('to').endOf('week'))

      return day.within(moment.range(from, to))
    })
  }
})
