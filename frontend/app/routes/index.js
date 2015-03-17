import Ember          from 'ember'
import moment         from 'moment'
import ProtectedRoute from 'timed/routes/protected'

export default ProtectedRoute.extend({
  queryParams: { 'day': { 'refreshModel': true, 'replace': true } }

, setupController(controller, model) {
    controller.set('model',      model)
    controller.set('dateString', moment().format('YYYY-MM-DD'))
  }

, model() {
    return this.session.get('user')
  }

, afterModel() {
    let user        = this.get('model.id')
    let assignments = this.store.find('assignment', { user })
    let attendances = this.store.find('attendance', { user })

    return Ember.RSVP.all([ assignments, attendances ])
  }
})
