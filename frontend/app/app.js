/* globals define, moment, vis, io */

import Ember            from 'ember'
import Resolver         from 'ember/resolver'
import loadInitializers from 'ember/load-initializers'
import config           from './config/environment'
import Notify           from 'ember-notify'

Ember.MODEL_FACTORY_INJECTIONS = true

let App = Ember.Application.extend({
  'modulePrefix':    config.modulePrefix
, 'podModulePrefix': config.podModulePrefix
, 'Resolver':        Resolver
})

define('moment', () => ({
  'default': moment
}))

define('socket.io', () => ({
  'default': io
}))

define('vis', () => ({
  'default':  vis
, 'Timeline': vis.Timeline
, 'DataSet':  vis.DataSet
, 'Graph2d':  vis.Graph2d
}))

Ember.$(window).on('error', ({ originalEvent: { error: err } }) =>
  Notify.error({
    raw: `<pre><strong>${err.name}:</strong> ${err.message}\n${err.stack}</pre>`
  , closeAfter: null
  })
)

loadInitializers(App, config.modulePrefix)

export default App
