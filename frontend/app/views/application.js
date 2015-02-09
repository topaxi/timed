import Ember from 'ember'

export default Ember.View.extend({
  collapseMenuItems: function() {
    this.$().find('.navbar-collapse').on('click', '[href]', () =>
      this.$().find('.navbar-toggle:visible').click()
    )
  }.on('didInsertElement')
})
