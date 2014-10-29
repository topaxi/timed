import DS from 'ember-data';

export default DS.Model.extend({
  'from':     DS.attr('moment')
, 'to':       DS.attr('moment')
, 'duration': DS.attr('number')
, 'user':     DS.belongsTo('user', { 'async': true })
, 'project':  DS.belongsTo('project', { 'async': true })
, 'tasks':    DS.hasMany('tasks', { 'async': true })
})
