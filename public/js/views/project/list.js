define(['backbone', 'models/project', 'text!views/project/list.html'],
    function(Backbone, Project, tpl) {
  'use strict'

  var ProjectList = Backbone.View.extend({
      'render': function() {
        var $el   = this.$el = $(tpl)
          , $list = $el.find('.list')

        this.model.each(function(project) {
          $list.append(
            $('<li>').text(' '+ project.get('name'))
                     .prepend(createTaskButton(project))
                     .prepend(createEditButton(project))
          )
        })

        $list.on('click', '.tasks', editTasks)
        $list.on('click', '.edit', edit)
        $el.find('.create').click(edit)
        $el.on('hidden', function() { $(this).remove() })
        $el.modal()
      }
  })

  function createEditButton(model) {
    return $('<a class="btn btn-small edit" data-dismiss="modal" data-placement="left" title="Edit project" rel="tooltip"><i class="icon-edit"></i></a>').data('model', model).tooltip()
  }

  function createTaskButton(model) {
    return $('<a class="btn btn-small tasks" data-dismiss="modal" data-placement="left" title="Edit project tasks" rel="tooltip"><i class="icon-tasks"></i></a>').data('model', model).tooltip()
  }

  function edit(e) {
    e.preventDefault()

    var model = $(this).data('model') || new Project

    require(['views/project/edit'], function(ProjectEdit) {
      (new ProjectEdit({ 'model': model })).render()
    })
  }

  function editTasks(e) {
    e.preventDefault()

    var model = $(this).data('model')

    require(['collections/task', 'views/task/list'], function(Tasks, TaskList) {
      var tasks = new Tasks
        , list  = new TaskList({ 'model': tasks })

      tasks.project = model

      tasks.fetch({ 'success': function() { list.render() } })
    })
  }

  return ProjectList
})
