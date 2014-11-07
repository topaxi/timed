import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';
import Notify from 'ember-notify';

Ember.MODEL_FACTORY_INJECTIONS = true

var App = Ember.Application.extend({
  'modulePrefix':    config.modulePrefix
, 'podModulePrefix': config.podModulePrefix
, 'Resolver':        Resolver
})

/* jshint ignore:start */
// Fix momentjs
define('moment', function() { return { 'default': window.moment } })

define('vis', function() {
  var vis = window.vis

  return {
    'default':  vis
  , 'Timeline': vis.Timeline
  , 'DataSet':  vis.DataSet
  , 'Graph2d':  vis.Graph2d
  }
})
/* jshint ignore:end */

window.addEventListener('error', function(err) {
  Notify.error(err.message)
}, false)

loadInitializers(App, config.modulePrefix)

export default App
