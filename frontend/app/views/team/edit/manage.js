import Ember from 'ember';
import moment from 'moment';
import { Timeline } from 'vis';

export default Ember.View.extend({
  'visOptions': {
    'stack':       false
  , 'editable':    true
  , 'orientation': 'top'
  , 'width':       '100%'
  , 'autoResize':  false
  , 'zoomable':    0
  , 'zoomMin':     1000 * 60 * 60 * 24 * 7 * 2 // Show ~2 weeks
  }
, 'store':       Ember.computed.alias('controller.store')
, 'assignments': Ember.computed.alias('controller.model.users.@each.assignments')
, 'flatAssignments': function() {
    var assignments = this.get('assignments')

    if (!assignments) {
      return []
    }

    return assignments.reduce((all, assignments) => {
      assignments.forEach(assignment => all.push(assignment))

      return all
    }, [])
  }.property('assignments.@each')
, 'visGroups': function() {
    return this.get('controller.users').map(user => ({
      'id':      user.id
    , 'content': user.get('longName')
    }))
  }.property('controller.users')
, 'visItems': function() {
    return this.get('flatAssignments').map(assignment => ({
      'id':      assignment.id
    , 'content': assignment.get('project.name')
    , 'start':   assignment.get('from').toDate()
    , 'end':     assignment.get('to') && assignment.get('to').toDate()
    , 'group':   assignment.get('user.id')
    }))
  }.property(
    'flatAssignments.@each.from'
  , 'flatAssignments.@each.to'
  , 'flatAssignments.@each.project'
  )
, 'add': function(item) {
    var store = this.get('store')
    var user  = store.find('user', item.group)

    user.then(user => {
      var from       = moment(item.start).startOf('day')
      var to         = moment(from).add(1, 'day')
      var assignment = store.createRecord('assignment', { user, from, to })

      this.get('controller').send('openModal', 'user/assignment', assignment)
    })
  }
, 'update': function(item) {
    var assignment = this.get('store').find('assignment', item.id)

    assignment.then(assignment => {
      this.get('controller').send('openModal', 'user/assignment', assignment)
    })
  }
, 'move': function(item) {
    var assignment = this.get('store').find('assignment', item.id)
    var user       = this.get('store').find('user',       item.group)

    Ember.RSVP.all([ user, assignment ]).then(r => {
      var [ user, assignment ] = r

      assignment.set('from', moment(item.start))
      assignment.set('to',   moment(item.end))
      assignment.set('user', user)

      assignment.save()
    })
  }
, 'remove': function(item, callback) {
    var assignment = this.get('store').find('assignment', item.id)

    assignment.then(assignment => {
      assignment.deleteRecord()
      assignment.save().then(() => callback(true))
    })
  }
, 'renderTimeline': function() {
    var timeline = this.get('timeline')

    timeline.setGroups(this.get('visGroups'))
    timeline.setItems(this.get('visItems'))
  }.observes('visGroups', 'visItems')
, 'setupTimeline': function() {
    var options = Ember.$.extend({}, this.get('visOptions'), {
      'onAdd':    (...args) => this.add(...args)
    , 'onUpdate': (...args) => this.update(...args)
    , 'onMove':   (...args) => this.move(...args)
    , 'onRemove': (...args) => this.remove(...args)
    })

    this.set('timeline', new Timeline(
      this.$()[0]
    , null
    , options
    ))

    this.renderTimeline()
  }.on('didInsertElement')
})
