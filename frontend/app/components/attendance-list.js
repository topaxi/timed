import Ember from 'ember';
import moment from 'moment';
import { Timeline } from 'vis';

export default Ember.Component.extend({
  'currentDay': null

, 'visOptions': {
    'stack':       true
  , 'editable':    true
  , 'orientation': 'top'
  //, 'autoResize':  false
  }

, 'init': function() {
    this.set('currentDay', moment().startOf('day'))
  }

, 'attendances': function() {
    return this.get('user').getAttendancesByDay(this.get('currentDay'))
                           .sort((a, b) => b.get('from').diff(a.get('from')))
  }.property('currentDay', 'user.attendances.@each')

, 'visItems': function() {
    var items = [ ]

    this.get('attendances').forEach(attendance => {
      items.push({
        'id':      attendance.id
      , 'type':    'background'
      , 'content': ''
      , 'title':   ''
      , 'start':   attendance.get('from').toDate()
      , 'end':     getDate(attendance.get('to'))
      })

      attendance.get('activities').forEach(activity => {
        items.push({
          'id': activity.id
        , 'content': ''
        , 'title':   ''
        , 'start':   activity.get('from').toDate()
        , 'end':     getDate(activity.get('to'))
        })
      })
    })

    console.log(items)
    return items
  }.property(
    'attendances'
  , 'attendances.@each.from'
  , 'attendances.@each.to'
  , 'attendances.@each.activities.@each.from'
  , 'attendances.@each.activities.@each.to'
  )

, 'renderTimeline': function() {
    var timeline = this.get('timeline')

    timeline.setItems(this.get('visItems'))
  }.observes('visItems')

, 'setupTimeline': function() {
    var options = Ember.$.extend({}, this.get('visOptions'), {
      'start':    moment(this.get('currentDay')).startOf('day').toDate()
    , 'end':      moment(this.get('currentDay')).endOf('day').toDate()
    , 'onAdd':    (item, callback) => this.controller.send('add',    item, callback)
    , 'onUpdate': (item, callback) => this.controller.send('update', item, callback)
    , 'onMove':   (item, callback) => this.controller.send('move',   item, callback)
    , 'onRemove': (item, callback) => this.controller.send('remove', item, callback)
    })

    this.set('timeline', new Timeline(
      this.$('#attendance-timeline')[0]
    , null
    , options
    ))

    this.renderTimeline()
  }.on('didInsertElement')
})

function getDate(m) {
  if (moment.isMoment(m) && m.isValid()) {
    return m.toDate()
  }

  return new Date()
}
