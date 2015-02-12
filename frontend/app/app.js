/* globals define, moment, vis */

import Ember            from 'ember'
import Resolver         from 'ember/resolver'
import loadInitializers from 'ember/load-initializers'
import config           from './config/environment'
import Notify           from 'ember-notify'

Ember.MODEL_FACTORY_INJECTIONS = true

var App = Ember.Application.extend({
  'modulePrefix':    config.modulePrefix
, 'podModulePrefix': config.podModulePrefix
, 'Resolver':        Resolver
})

define('moment', () => ({
  'default': moment
}))

define('vis', () => ({
  'default':  vis
, 'Timeline': vis.Timeline
, 'DataSet':  vis.DataSet
, 'Graph2d':  vis.Graph2d
}))

Ember.$(window).on('error', err => Notify.error(err.message || err))

loadInitializers(App, config.modulePrefix)

export default App
