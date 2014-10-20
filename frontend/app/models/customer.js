import DS from 'ember-data';

export default DS.Model.extend({
  'name':     DS.attr('string')
, 'projects': DS.hasMany('projects', { 'async': true })
})
