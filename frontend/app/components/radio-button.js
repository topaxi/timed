import Ember from 'ember'

export default Ember.Component.extend({
  tagName: 'input'
, type:    'radio'

, attributeBindings: [ 'checked', 'name', 'type', 'value' ]

, setInitialValue: function() {
    this.set('checked', this.get('value') === this.get('groupValue'))
  }.on('didInsertElement')

, checked: function() {
    if (this.get('value') === this.get('groupValue')) {
      Ember.run.once(this, 'takeAction')

      return true
    }

    return false
  }

, takeAction: function() {
    this.sendAction('selectedAction', this.get('value'))
  }

, change: function() {
    this.set('groupValue', this.get('value'))
    Ember.run.once(this, 'checked') // manual observer
  }
})
