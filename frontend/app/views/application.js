import Ember from 'ember'

export default Ember.View.extend({
  collapleMenuItems: function() {
    let $navbarCollapse = this.$().find('.navbar-collapse')

    $navbarCollapse.on('click', '[href]', () =>
      $navbarCollapse.collapse('hide')
    )
  }.on('didInsertElement')
})
