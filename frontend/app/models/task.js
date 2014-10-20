import DS from 'ember-data';

export default DS.Model.extend({
  'name':     DS.attr('string')
, 'project':  DS.belongsTo('project')
, 'duration': DS.attr('number')
, 'from':     DS.attr('utc')
, 'to':       DS.attr('utc')
, 'tasks':    DS.hasMany('task')
, 'priority': DS.attr('number')
, 'done':     DS.attr('boolean')
})
