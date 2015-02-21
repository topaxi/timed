import Ember from 'ember'

export default Ember.Component.extend({
  tagName: 'button'
, attributeBindings: [ 'type' ]
, classNames: [ 'btn', 'btn-danger' ]
, type: 'button'
, confirmed: false
, click() {
    if (this.get('confirmed')) {
      return this.sendAction()
    }

    this.$().text('Sure?')
    this.set('confirmed', true)
  }
})
