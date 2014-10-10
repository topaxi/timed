import Ember from 'ember';

export default {
  name: 'browser-autofill-fix'
, initialize: function() {
    Ember.TextField.reopen({
      fetchAutofilledValue: function() {
        var $textField = this.$()

        setTimeout(function() {
          $textField.trigger('change')
        }, 250)
      }.on('didInsertElement')
    })
  }
}
