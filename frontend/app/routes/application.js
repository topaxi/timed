import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  'actions': {
    'openModal': function(name, model) {
      return this.render(`modal/${name}`, {
        'into':       'application'
      , 'outlet':     'modal'
      , 'controller': `modal.${name}`
      , 'model':      model
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
