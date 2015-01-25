import DS    from 'ember-data'
import Model from './model'

export default Model.extend({
  'name':     DS.attr('string')
, 'projects': DS.hasMany('projects', { 'async': true })
})
