import DS    from 'ember-data'
import Model from './model'

export default Model.extend({
  'name':     DS.attr('string')
, 'customer': DS.belongsTo('customer', { 'async': true })
, 'tasks':    DS.hasMany('task', { 'async': true })
, 'from':     DS.attr('moment')
, 'to':       DS.attr('moment')
, 'done':     DS.attr('boolean')
})
