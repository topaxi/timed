import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [ 'modal', 'fade' ]
, okText: 'OK'
, closeText: 'Close'
, show: function() {
    this.$().modal().on('hidden.bs.modal', () => this.sendAction('close'))
  }.on('didInsertElement')
, actions: {
    ok: function() {
      this.$().modal('hide')
      this.sendAction('ok')
    }
  , delete: function() {
      this.$().modal('hide')
      this.sendAction('delete')
    }
  }
})
