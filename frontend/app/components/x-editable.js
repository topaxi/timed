import Ember from 'ember';

export default Ember.Component.extend({
  setupEditable: function() {
    let options = {
      placeholder: this.get('placeholder')
    , emptytext:   this.get('emptytext')
    , value:       this.get('value')
    , success:     (res, value) => this.sendAction('setValue', value)
    }

    let $editable = Ember.$('<a>').editable(options)
    this.set('$editable', $editable)
    this.$().append($editable)
  }.on('didInsertElement')

, updateValue: function() {
    this.get('$editable').editable('setValue', this.get('value'))
  }.observes('value')
})
