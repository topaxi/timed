import Ember from 'ember'

export default Ember.View.extend({
  collapseMenuItems: function() {
    let $navbarCollapse = this.$().find('.navbar-collapse')

    $navbarCollapse.on('click', '[href]', () =>
      $navbarCollapse.collapse('hide')
    )
  }.on('didInsertElement')
})
