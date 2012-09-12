define(['backbone', 'models/task', 'text!views/task/list.html'],
    function(Backbone, Task, tpl) {
  'use strict'

  var TaskList = Backbone.View.extend({
      'render': function() {
        var $el     = this.$el = $(tpl)
          , $list   = $el.find('.list')
          , project = this.model.project

        $el.find('h3').text('Tasks of '+ project.get('name'))

        this.model.each(function(model) {
          $list.append(
            $('<li>').text(' '+ model.get('name'))
                     .prepend(createEditButton(model))
          )
        })

        $list.on('click', '.edit', edit)
        $el.find('.create').click(edit)
        $el.on('hidden', function() { $(this).remove() })
        $el.modal()

        function edit(e) {
          e.preventDefault()

          var model = $(this).data('model') || new Task

          if (!model.has('project')) model.set('project', project)

          require(['views/task/edit'], function(TaskEdit) {
            (new TaskEdit({ 'model': model })).render()
          })
        }
      }
  })

  function createEditButton(model) {
    return $('<a class="btn btn-small edit" data-dismiss="modal" data-placement="left" title="Edit task" rel="tooltip"><i class="icon-edit"></i></a>').data('model', model).tooltip()
  }

  return TaskList
})
