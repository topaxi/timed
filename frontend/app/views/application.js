import Ember from 'ember'

export default Ember.View.extend({
  collapseMenuItems: function() {
    let $collapse = this.$('.navbar-collapse')
    let $toggle   = this.$('.navbar-toggle')

    $collapse.on('click', '[href]', e => {
      if (!$toggle.is(':visible')) {
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
