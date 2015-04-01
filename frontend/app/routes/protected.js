import Ember from 'ember'
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin'

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.get('session.user')
  }
})
