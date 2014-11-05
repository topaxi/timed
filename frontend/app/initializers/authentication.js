import Notify from 'ember-notify';
import ApplicationAdapter from 'timed/adapters/application';

export default {
  name: 'authentication'
, after: 'simple-auth'
, initialize: function(container) {
    var applicationRoute = container.lookup('route:application')
    var session          = container.lookup('simple-auth-session:main')

    ApplicationAdapter.reopen({
      'ajaxError': function(xhr) {
        this._super(xhr)

        if (xhr.status === 401) {
          session.invalidate()
        }
      }
    })

    session.on('sessionAuthenticationFailed', function(err) {
      Notify.error(err ? err.message : 'Authentication error!')

      applicationRoute.transitionTo('/login')
    })
  }
}
