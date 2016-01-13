import Ember from 'ember'

export default Ember.Component.extend({
  tagName: 'input'
, type:    'radio'

, attributeBindings: [ 'checked', 'name', 'type', 'value' ]

, init(...args) {
    this._super(...args)
    this.set('checked', this.get('value') === this.get('groupValue'))
  }

, checked() {
    if (this.get('value') === this.get('groupValue')) {
      Ember.run.once(this, 'takeAction')

      return true
    }

    return false
  }

, takeAction() {
    this.sendAction('selectedAction', this.get('value'))
  }

, change() {
    this.set('groupValue', this.get('value'))
    Ember.run.once(this, 'checked') // manual observer
  }
})
