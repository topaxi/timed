export function initialize(container, application) {
  application.inject('controller:application', 'application', 'application:main')
  application.inject('service:socket',         'application', 'application:main')
}

export default {
  name: 'inject'
, initialize
}
