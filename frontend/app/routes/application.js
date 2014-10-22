import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  'actions': {
    'openModal': function(name, model) {
      this.controllerFor(`modal.${name}`).set('model', model)

      return this.render(`modal/${name}`, {
        'into':   'application'
      , 'outlet': 'modal'
      })
    }
  , 'closeModal': function() {
      return this.disconnectOutlet({
        'outlet':     'modal'
      , 'parentView': 'application'
      })
    }
  }
})
