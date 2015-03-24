import Ember from 'ember'
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin'

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  socket: Ember.inject.service()

, model() {
    let user = this.get('session.user.id')

    return Ember.RSVP.all([
      this.store.find('customer')
    , this.store.find('project')
    , this.store.find('task')
    , this.store.find('attendance', { user })
    ])
  }

, afterModel() {
    this.get('socket')
  }
})
