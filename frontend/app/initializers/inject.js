export function initialize(container, application) {
  application.inject('controller:application', 'application', 'application:main')
}

export default {
  name: 'inject'
, initialize
}
