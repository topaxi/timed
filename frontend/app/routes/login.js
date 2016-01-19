import $                         from 'jquery'
import Ember                     from 'ember'
import UnauthenticatedRouteMixin from 'simple-auth/mixins/unauthenticated-route-mixin'

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  afterModel() {
    if (this.session.isAuthenticated) {
      this.replaceWith('/')
    }
  },
  activate() {
    $('body').addClass('page-login')
  },
  deactivate() {
    $('body').removeClass('page-login')
  }
})
