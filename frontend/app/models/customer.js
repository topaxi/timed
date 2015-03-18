import DS    from 'ember-data'
import Model from './model'

export default Model.extend({
  'projects': DS.hasMany('projects', { 'async': true })
, 'name':     DS.attr('string')
, 'email':    DS.attr('string')
, 'website':  DS.attr('string')
, 'comment':  DS.attr('string')
})
