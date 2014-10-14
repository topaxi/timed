import DS from 'ember-data';

export default DS.Model.extend({
  'name':     DS.attr('string')
, 'customer': DS.belongsTo('customer')
//, 'tasks':    DS.hasMany('task')
, 'from':     DS.attr('utc')
, 'to':       DS.attr('utc')
, 'done':     DS.attr('boolean')
})
