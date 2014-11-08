import DS from 'ember-data';
import moment from 'moment';

export default DS.Model.extend({
  'user':       DS.belongsTo('user', { 'async': true })
, 'activities': DS.hasMany('activity')
, 'from':       DS.attr('moment')
, 'to':         DS.attr('moment')

, 'end': function() {
    this.set('to', moment())

    return this
  }
})
