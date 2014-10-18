import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'table'
, classNames: [ 'table' ]
, tasks: function() {
    return this.project.store.find('task', { 'project': this.project.id })
  }.property('project.tasks.@each')
})
