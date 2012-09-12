define(['backbone', 'models/project', 'text!views/project/list.html'],
    function(Backbone, Project, tpl) {
  'use strict'

  var ProjectList = Backbone.View.extend({
      'events': { 'click .tasks':  'showTasks'
                , 'click .edit':   'edit'
                , 'click .create': 'edit'
                }
    , 'render': function() {
        var self  = this
          , $el   = self.$el = $(tpl)
          , $list = $el.find('.list')

        self.delegateEvents()

        self.model.each(function(project) {
          $list.append(
            $('<li>').text(' '+ project.get('name'))
                     .prepend(createTaskButton(project))
                     .prepend(createEditButton(project))
          )
        })

        $el.on('hide',   function() { self.trigger('close') })
        $el.on('hidden', function() { $(this).remove() })
        $el.modal()
      }
    , 'edit': function(e) {
        var model = $(e.currentTarget).data('model') || new Project
          , self  = this

        require(['views/project/edit'], function(ProjectEdit) {
          var view = new ProjectEdit({ 'model': model })

          view.on('close', function() { self.render() })

          view.render()
        })
      }
    , 'showTasks': function(e) {
        var model = $(e.currentTarget).data('model')
          , self  = this

        require(['collections/task', 'views/task/list'], function(Tasks, TaskList) {
          var tasks = new Tasks
            , view  = new TaskList({ 'model': tasks })

          //view.on('close', function() { self.render() })

          tasks.project = model

          tasks.fetch({ 'success': function() { view.render() } })
        })
      }
  })

  function createEditButton(model) {
    return $('<a class="btn btn-small edit" data-dismiss="modal" data-placement="left" title="Edit project" rel="tooltip"><i class="icon-edit"></i></a>').data('model', model).tooltip()
  }

  function createTaskButton(model) {
    return $('<a class="btn btn-small tasks" data-placement="left" title="Edit project tasks" rel="tooltip"><i class="icon-tasks"></i></a>').data('model', model).tooltip()
  }

  return ProjectList
})
