import Ember from 'ember';

export default {
  name: 'tooltips'
, initialize: function() {
    Ember.$('body').tooltip({
      'selector': '.tip'
    , 'container': 'main'
    })
  }
}
