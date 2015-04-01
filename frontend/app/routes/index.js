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
    let day         = this.get('day') || moment().startOf('day')
    let startOfWeek = +moment().subtract(1, 'week').startOf('week')
    let assignments = this.store.find('assignment', { user, from: startOfWeek })
    let attendances = this.store.find('attendance', { user, from: +moment(day, 'YYYY-MM-DD') })

    return Ember.RSVP.all([ assignments, attendances ])
  }
})
