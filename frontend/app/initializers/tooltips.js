import Ember from 'ember'

export default {
  name: 'tooltips'
, initialize() {
    Ember.$('body').tooltip({
      'selector': '.tip'
    , 'container': 'body'
    })
  }
}
