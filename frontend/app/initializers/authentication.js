import Notify from 'ember-notify';

export default {
  name: 'authentication'
, after: 'simple-auth'
, initialize: function(container) {
    var session = container.lookup('simple-auth-session:main')

    session.on('sessionAuthenticationFailed', function(err) {
      Notify.warning(err ? err.message : 'Authentication error!')
    })
  }
}
