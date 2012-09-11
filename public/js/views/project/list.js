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
                     .prepend(createEditButton(project))
          )
        })

        $list.on('click', '.edit', edit)
        $el.find('.create').click(edit)
        $el.on('hidden', function() { $(this).remove() })
        $el.modal()
      }
  })

  function createEditButton(model) {
    return $('<a class="btn btn-small edit" data-dismiss="modal"><i class="icon-edit"></a>').data('model', model)
  }

  function edit(e) {
    e.preventDefault()

    var model = $(this).data('model') || new Project

    require(['views/project/edit'], function(ProjectEdit) {
      (new ProjectEdit({ 'model': model })).render()
    })
  }

  return ProjectList
})
