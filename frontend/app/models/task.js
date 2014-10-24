import DS from 'ember-data';

export default DS.Model.extend({
  'name':     DS.attr('string')
, 'project':  DS.belongsTo('project', { 'async': true })
, 'duration': DS.attr('number')
, 'from':     DS.attr('moment')
, 'to':       DS.attr('moment')
, 'tasks':    DS.hasMany('task')
, 'priority': DS.attr('number')
, 'done':     DS.attr('boolean')
})
