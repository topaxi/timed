import Ember  from 'ember'
import moment from 'moment'

const { computed, observer } = Ember

export default Ember.Controller.extend({
  dateFormat: 'L LT'

, init() {
    this.set('tasks', this.store.find('task'))
  }

, sortedTasks: computed('tasks', {
    get() {
      return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
        'content':        this.get('tasks')
      , 'sortProperties': [ 'project.name' ]
      , 'sortAscending':  false
      })
    }
  })

, createActivityForAttendance: observer('model', function() {
    if (this.get('model.activities')) {
      this.set('model', this.store.createRecord('activity', {
        'attendance': this.get('model')
      }))
    }
  })

, from: computed('model.from', {
    get() {
      let from = this.get('model.from')

      return from && from.format(this.dateFormat)
    }
  })

, to: computed('model.to', {
    get() {
      let to = this.get('model.to')

      return to && to.format(this.dateFormat)
    }
  })

, actions: {
    save() {
      let activity = this.get('model')

      activity.set('from', moment(this.get('from'), this.dateFormat))
      activity.set('to',   moment(this.get('to'),   this.dateFormat))

      activity.save()
    }

  , delete() {
      this.get('model').destroyRecord()
    }
  }
})
