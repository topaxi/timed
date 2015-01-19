import Ember from 'ember';
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

, 'updateProgress': function() {
    return Ember.$.getJSON(`/api/v1/tasks/${this.id}/progress`).then(res => {
      this.set('progress', res.progress)

      return res.progress
    })
  }

, 'progress': function() {
    this.updateProgress()

    return 0
  }.property()

, 'percent': function() {
    var duration = this.get('duration')

    if (!duration) {
      return 0
    }

    return this.get('progress') / duration * 100
  }.property('duration', 'progress')
})
