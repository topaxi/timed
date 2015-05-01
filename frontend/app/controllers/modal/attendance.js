import Ember  from 'ember'
import moment from 'moment'

const { computed, observer } = Ember

export default Ember.Controller.extend({
  dateFormat: 'L LT'

, createAttendance: observer('model', function() {
    let model = this.get('model')

    if (moment.isMoment(model)) {
      this.set('model', this.store.createRecord('attendance', {
        'from': moment(model).startOf('day')
      , 'user': this.container.lookup('simple-auth-session:main').get('user')
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
      let attendance = this.get('model')

      attendance.set('from', moment(this.get('from'), this.dateFormat))
      attendance.set('to',   moment(this.get('to'),   this.dateFormat))

      attendance.save()
    }

  , delete() {
      this.get('model').destroyRecord()
    }
  }
})
