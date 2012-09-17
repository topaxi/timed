define(['backbone', 'models/task', 'text!views/task/list.html'],
    function(Backbone, Task, tpl) {
  'use strict'

  var TaskList = Backbone.View.extend({
      'events': { 'click .edit':   'edit'
                , 'click .create': 'edit'
                }
    , 'render': function() {
        var self    = this
          , project = self.model.project
          , $el     = self.$el = $(tpl)
          , $list   = $el.find('.list')

        self.delegateEvents()

        $el.find('h3').text('Tasks of '+ project.get('name'))

        self.model.each(function(model) {
          $list.append(
            $('<li>').text(' '+ model.get('name'))
                     .prepend(createEditButton(model))
          )
        })

        $el.on('hide',   function() { self.trigger('close') })
        $el.on('hidden', function() { $(this).remove() })
        $el.modal()
      }
    , 'edit': function(e) {
        this.off('close')
        this.$el.modal('hide')

        var model = $(e.currentTarget).data('model') || new Task
          , self  = this

        if (!model.has('project')) model.set('project', self.model.project)

        require(['views/task/edit'], function(TaskEdit) {
          var view = new TaskEdit({ 'model': model })

          view.on('close', function() { self.render() })

          view.render()
        })
      }
  })

  function createEditButton(model) {
    return $('<a class="btn btn-small edit" data-placement="left" title="Edit task" rel="tooltip"><i class="icon-edit"></i></a>').data('model', model).tooltip()
  }

  return TaskList
})
