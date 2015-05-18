import Ember                 from 'ember'
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin'
import LoadingIndicator      from 'timed/mixins/loading-indicator'

export default Ember.Route.extend(ApplicationRouteMixin, LoadingIndicator, {
  actions: {
    openModal(name, model) {
      return this.render(`modal/${name}`, {
        'into':       'application'
      , 'outlet':     'modal'
      , 'controller': `modal.${name}`
      , 'model':      model
      })
    }

  , closeModal() {
      return this.disconnectOutlet({
        'outlet':     'modal'
      , 'parentView': 'application'
      })
    }
  }
})
