define(['backbone', 'models/user', 'text!views/user/list.html'],
    function(Backbone, User, tpl) {
  'use strict';

  var UserList = Backbone.View.extend({
      'events': { 'click .edit':   'edit'
                , 'click .create': 'edit'
                , 'click .time':   'editWorktime'
                }
    , 'render': function() {
        var self  = this
          , $el   = self.$el = $(tpl)
          , $list = $el.find('.list')

        self.delegateEvents()

        self.model.each(function(user) {
          $list.append(
            $('<li>').text(' '+ user.get('name'))
                     .prepend(createTimeButton(user))
                     .prepend(createEditButton(user))
          )
        })

        $el.on('hide',   function() { self.trigger('close') })
        $el.on('hidden', function() { $(this).remove() })
        $el.modal()
      }
    , 'edit': function(e) {
        var model = $(e.currentTarget).data('model') || new User
          , self  = this

        require(['views/user/edit'], function(UserEdit) {
          var view = new UserEdit({ 'model': model, 'collection': self.model })

          view.on('close', function() { self.render() })

          view.render()
        })
      }
    , 'editWorktime': function(e) {
        var model = $(e.currentTarget).data('model') || new User
          , self  = this

        require(['views/user/time'], function(UserTime) {
          var view = new UserTime({ 'model': model })

          view.on('close', function() { self.render() })

          view.render()
        })
      }
  })

  function createEditButton(model) {
    return $('<a class="btn btn-small edit" data-dismiss="modal" data-placement="left" title="Edit user" rel="tooltip"><i class="icon-edit"></i></a>').data('model', model).tooltip()
  }

  function createTimeButton(model) {
    return $('<a class="btn btn-small time" data-dismiss="modal" data-placement="left" title="Set user worktime" rel="tooltip"><i class="icon-time"></i></a>').data('model', model).tooltip()
  }

  return UserList
})
