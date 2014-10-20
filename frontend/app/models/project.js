import DS from 'ember-data';

export default DS.Model.extend({
  'name':     DS.attr('string')
  // TODO: Async customer sometimes messes up the edit form after some transitions
  //       probably because we're comparing with a promise instead of the
  //       actual object / id
, 'customer': DS.belongsTo('customer', { 'async': true })
, 'tasks':    DS.hasMany('task', { 'async': true })
, 'from':     DS.attr('utc')
, 'to':       DS.attr('utc')
, 'done':     DS.attr('boolean')
})
