define(['backbone'], function(Backbone) {
  'use strict'

  var DashboardProjectView = Backbone.View.extend({
      'events': {}
    , 'tagName':   'div'
    , 'classNmae': 'project'
    , 'render': function() {
        this.$el.append($('<h4>').text(this.model.get('name')))
      }
  })

  return DashboardProjectView
})
