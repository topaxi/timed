define(['backbone', 'models/user', 'text!views/user/list.html'],
    function(Backbone, User, tpl) {
  'use strict'

  var UserList = Backbone.View.extend({
      'render': function() {
        var $el   = this.$el = $(tpl)
          , $list = $el.find('.list')

        this.model.each(function(user) {
          $list.append(
            $('<li>').text(' '+ user.get('name'))
                     .prepend(createEditButton(user))
          )
        })

        $list.on('click', '.edit', edit)
        $el.find('.create').click(edit)
        $el.on('hidden', function() { $(this).remove() })
        $el.modal()
      }
  })

  function createEditButton(model) {
    return $('<a class="btn btn-small edit" data-dismiss="modal" data-placement="left" title="Edit user" rel="tooltip"><i class="icon-edit"></i></a>').data('model', model).tooltip()
  }

  function edit(e) {
    e.preventDefault()

    var model = $(this).data('model') || new User

    require(['views/user/edit'], function(UserEdit) {
      (new UserEdit({ 'model': model })).render()
    })
  }

  return UserList
})
