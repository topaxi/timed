import DS from 'ember-data';
import moment from 'moment';

export default DS.Model.extend({
  'attendance': DS.belongsTo('attendance')
, 'task':       DS.belongsTo('task', { 'async': true })
, 'from':       DS.attr('utc')
, 'to':         DS.attr('utc')

, 'end': function() {
    this.set('to', moment())
  }
})
