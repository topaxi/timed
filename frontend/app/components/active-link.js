import Ember from 'ember'

const { computed } = Ember

export default Ember.Component.extend({
  tagName:           'li'
, classNames:        [ 'active-link' ]
, classNameBindings: [ 'active' ]

, active: computed('childViews.@each.active', {
    get() {
      return this.get('childViews').anyBy('active')
    }
  })
})
