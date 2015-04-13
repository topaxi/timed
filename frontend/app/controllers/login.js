import Ember from 'ember';
import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';

export default Ember.Controller.extend(LoginControllerMixin, {
  authenticator: 'authenticator:custom'
, actions: {
    authenticate() {
      this.set('loading', true)

      this._super().finally(() => this.set('loading', false))
    }
  }
})
