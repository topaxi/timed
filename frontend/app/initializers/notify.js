import Notify from 'ember-notify';

export default {
  name: 'notify'
, initialize: function() {
    Notify.useBootstrap()
  }
}
