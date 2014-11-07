import DS from 'ember-data';
import moment from 'moment';

export default DS.Model.extend({
  'from':     DS.attr('moment')
, 'to':       DS.attr('moment')
, 'duration': DS.attr('number')
, 'user':     DS.belongsTo('user',    { 'async': true })
, 'project':  DS.belongsTo('project', { 'async': true })
, 'tasks':    DS.hasMany('tasks',     { 'async': true })

, 'potentialWorktime': function() {
    var worktime     = 0
    var userWorktime = this.get('user.worktime')

    moment.range(this.get('from'), this.get('to')).by('days', day => {
      worktime += userWorktime[day.format('YYYY-MM-DD')] || 0
    })

    return worktime
  }.property('from', 'to', 'user.worktime')
})
