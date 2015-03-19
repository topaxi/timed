import Ember from 'ember'
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin'

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return Ember.RSVP.all([
      this.store.find('customer')
    , this.store.find('project')
    , this.store.find('task')
    ])
  }

, afterModel() {
    let user        = this.get('session.user.id')
    let attendances = this.store.find('attendance', { user })

    return attendances
  }
})
