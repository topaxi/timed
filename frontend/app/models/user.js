import DS from 'ember-data';

export default DS.Model.extend({
    'name':     DS.attr('string')
  , 'password': DS.attr('password')
})
