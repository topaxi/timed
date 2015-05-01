import Ember        from 'ember'
import moment       from 'moment'
import { Timeline } from 'vis'

const ZOOM = 1000 * 60 * 60 * 24 * 7 * 2 // Show ~2 weeks
const { computed, observer } = Ember

export default Ember.View.extend({
  visOptions: {
    stack:       true
  , editable:    true
  , orientation: 'top'
  , autoResize:  false
  , zoomMin:     ZOOM
  }

, assignments: computed.alias('controller.model.users.@each.assignments')

, flatAssignments: computed('assignments.@each', {
    get() {
      return this.get('assignments').reduce((all, assignments) => {
        assignments.forEach(assignment => all.push(assignment))

        return all
      }, [])
    }
  })

, visGroups: computed('controller.users', {
    get() {
      return this.get('controller.model.users').map(user => Object({
        'id':      user.id
      , 'content': user.get('longName')
      }))
    }
  })

, visItems: computed('flatAssignments.@each.from', 'flatAssignments.@each.to', 'flatAssignments.@each.project', {
    get() {
      return this.get('flatAssignments').map(assignment => {
        let title = `${assignment.get('project.name')} (${assignment.get('potentialWorktime')} hours)`

        return {
          'id':      assignment.id
        , 'content': title
        , 'title':   title
        , 'start':   assignment.get('from')
        , 'end':     assignment.get('to')
        , 'group':   assignment.get('user.id')
        }
      })
    }
  })

, renderTimeline: observer('visGroups', 'visItems', function() {
    let timeline = this.get('timeline')

    timeline.setGroups(this.get('visGroups'))
    timeline.setItems(this.get('visItems'))
  })

, setupTimeline: function() {
    let controller = this.get('controller')
    let options    = Ember.$.extend({}, this.get('visOptions'), {
      'start':    moment().subtract(1, 'week')
    , 'end':      moment().endOf('week').add(2, 'week')
    , 'onAdd':    (item, callback) => controller.send('add',    item, callback)
    , 'onUpdate': (item, callback) => controller.send('update', item, callback)
    , 'onMove':   (item, callback) => controller.send('move',   item, callback)
    , 'onRemove': (item, callback) => controller.send('remove', item, callback)
    })

    this.set('timeline', new Timeline(
      this.$()[0]
    , null
    , options
    ))

    this.renderTimeline()
  }.on('didInsertElement')
})
