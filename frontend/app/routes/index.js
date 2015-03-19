import Ember  from 'ember'
import moment from 'moment'

export default Ember.Route.extend({
  queryParams: { 'day': { 'refreshModel': true, 'replace': true } }

, setupController(controller, model) {
    controller.set('model',      model)
    controller.set('dateString', moment().format('YYYY-MM-DD'))
  }

, afterModel() {
    let user        = this.get('session.user.id')
    let assignments = this.store.find('assignment', { user })
    let attendances = this.store.find('attendance', { user })

    return Ember.RSVP.all([ assignments, attendances ])
  }
})
