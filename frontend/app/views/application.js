import Ember from 'ember'

export default Ember.View.extend({
  collapseMenuItems: function() {
    let $navbar    = this.$('.navbar')
    let $collapse  = $navbar.find('.navbar-collapse')
    let $toggle    = this.$('.navbar-toggle')
    let isExpanded = () => $collapse.attr('aria-expanded') !== 'true'

    $navbar.on('click', '[href]', e => {
      if (isExpanded()) {
        return
      }

      e.preventDefault()
      e.stopImmediatePropagation()

      $toggle.click()

      let href       = e.currentTarget.getAttribute('href')
      let controller = this.get('controller')
      let transition = () => controller.transitionToRoute(href)

      $collapse.on('hidden.bs.collapse', transition)
    })
  }.on('didInsertElement')
})
