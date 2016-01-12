/* globals define, vis, io, ramjet, NProgress */

import Ember            from 'ember'
import Resolver         from 'ember-resolver'
import loadInitializers from 'ember/load-initializers'
import config           from './config/environment'
import Notify           from 'ember-notify'

Ember.MODEL_FACTORY_INJECTIONS = true

let App = Ember.Application.extend({
  'modulePrefix':    config.modulePrefix
, 'podModulePrefix': config.podModulePrefix
, 'Resolver':        Resolver
})

define('ramjet', () => Object({
  'default': ramjet
}))

define('socket.io', () => Object({
  'default': io
}))

define('vis', () => Object({
  'default':  vis
, 'Timeline': vis.Timeline
, 'DataSet':  vis.DataSet
, 'Graph2d':  vis.Graph2d
}))

define('nprogress', () => Object({
  'default': NProgress
}))

Ember.$(window).on('error', ({ originalEvent: { error: err } }) => {
  if (!err) return

  Notify.error({
    raw: `<pre><strong>${err.name}:</strong> ${err.message}\n${err.stack}</pre>`
  , closeAfter: null
  })
})

loadInitializers(App, config.modulePrefix)

export default App
