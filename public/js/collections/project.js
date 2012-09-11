define(['backbone', 'models/project'], function(Backbone, Project) { 'use strict'
  var Projects = Backbone.Collection.extend({
      'model': Project
    , 'url':   '/project'
  })

  return Projects
})
