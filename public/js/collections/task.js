define(['backbone', 'models/task'], function(Backbone, Task) { 'use strict';
  var Tasks = Backbone.Collection.extend({
      'model': Task
    , 'url':   function() {
                 var url = '/task'

                 if (this.user) {
                   url = '/user/'+ this.user.id +'/tasks'
                 }
                 else if (this.project && this.project.id) {
                   url = '/project/'+ this.project.id +'/tasks'
                 }

                 return url
               }
  })

  return Tasks
})
