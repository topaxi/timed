import Notify             from 'ember-notify'
import ApplicationAdapter from 'timed/adapters/application'

export default {
  name: 'authentication'
, after: 'simple-auth'
, initialize(container) {
    let applicationRoute = container.lookup('route:application')
    let session          = container.lookup('simple-auth-session:main')

    ApplicationAdapter.reopen({
      ajaxError(xhr) {
        this._super(xhr)

        if (xhr.status === 401) {
          session.invalidate()
        }
      }
    })

    session.on('sessionAuthenticationFailed', err => {
      Notify.error(err ? err.message : 'Authentication error!')

      applicationRoute.transitionTo('/login')
    })
  }
}
