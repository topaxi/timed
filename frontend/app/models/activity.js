import DS from 'ember-data';
import moment from 'moment';

export default DS.Model.extend({
  'attendance': DS.belongsTo('attendance')
, 'task':       DS.belongsTo('task', { 'async': true })
, 'from':       DS.attr('moment')
, 'to':         DS.attr('moment')

, 'end': function() {
    this.set('to', moment())
  }
})
