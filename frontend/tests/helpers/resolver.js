/* globals define, moment, vis */

import Resolver from 'ember/resolver'
import config   from '../../config/environment'

var resolver = Resolver.create();

// Phantomjs 1.9 doesn't know Function#bind
if (!Function.prototype.bind) {
  Function.prototype.bind = function(context, ...args) {
    return () => this.apply(context, args)
  }
}

resolver.namespace = {
  modulePrefix: config.modulePrefix
, podModulePrefix: config.podModulePrefix
}

define('moment', () => ({
  'default': moment
}))

define('vis', () => ({
  'default':  vis
, 'Timeline': vis.Timeline
, 'DataSet':  vis.DataSet
, 'Graph2d':  vis.Graph2d
}))

export default resolver
