import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  'actions': {
    'openModal': function(name, content) {
      this.controllerFor('modal.' + name).set('content', content)

      return this.render('modal/' + name, {
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
