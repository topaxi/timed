import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';
import DS from 'ember-data';
import Notify from 'ember-notify';

Ember.MODEL_FACTORY_INJECTIONS = true

var App = Ember.Application.extend({
  modulePrefix:    config.modulePrefix
, podModulePrefix: config.podModulePrefix
, Resolver:        Resolver
})

DS.RESTSerializer.reopen({ 'primaryKey': '_id' })
DS.RESTAdapter.reopen({
  'namespace': 'api/v1'
, 'coalesceFindRequests': true
, 'ajaxError': function(xhr) {
    var error

    try {
      error = JSON.parse(xhr.responseText)
    }
    catch (e) {
      error = xhr.responseText
    }

    Notify.error(error)
  }
})

/* jshint ignore:start */
// Fix momentjs
define('moment', function() { return { 'default': window.moment } })
/* jshint ignore:end */

window.addEventListener('error', function(err) {
  Notify.error(err.message)
}, false)

loadInitializers(App, config.modulePrefix)

export default App
