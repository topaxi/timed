import Ember from 'ember';
import promiseDelay from '../utils/promise-delay';

export default Ember.Component.extend({
  classNames: [ 'progress' ]
, attributeBindings: [ 'title' ]

, percent: Ember.computed.alias('task.percent')

, title: function() {
    return `${this.get('percent') | 0}%`
  }.property('percent')

, info: function() {
    let percent = this.get('percent')

    if (percent > 100) {
      return 100 / percent * 100
    }

    return percent
  }.property('percent')

, warning: function() {
    let percent = this.get('percent')

    if (percent > 100) {
      let warning = percent - 100

      return warning / percent * 100
    }

    return 0
  }.property('percent')

, update: function() {
    this.$('.progress-bar-info').css('width', `${this.get('info')}%`)
    this.$('.progress-bar-warning').css('width', `${this.get('warning')}%`)
  }.observes('percent').on('didInsertElement')

, visibility: function() {
    this.$().toggle(!!this.get('task.duration'))
  }.observes('task.duration').on('didInsertElement')

, fetchProgress: function() {
    let $progressbar = this.$('.progress-bar')

    $progressbar.addClass('active')

    Ember.RSVP.all([ this.get('task').updateProgress(), promiseDelay(500) ])
              .then(() => $progressbar.removeClass('active'))
  }.on('click')
})
