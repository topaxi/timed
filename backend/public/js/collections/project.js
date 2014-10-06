define(['backbone', 'models/project'], function(Backbone, Project) { 'use strict';
  var Projects = Backbone.Collection.extend({
      'model': Project
    , 'url': function() {
        var url = '/project'

        if (this.user) {
          var projects = this.user.get('projects')

          if (projects.length > 1) {
            url += '?'+ projects.reduce(function(a, b) {
              return (a ? a +'&' : a) +'id='+ (b._id || b)
            }, '')
          }
          else if (projects[0]) {
            url += '/'+ projects[0]
          }
        }

        return url
      }
  })

  return Projects
})
