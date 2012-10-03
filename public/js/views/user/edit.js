define(['backbone', 'text!views/user/edit.html'], function(Backbone, tpl) {
  'use strict';

  var UserEdit = Backbone.View.extend({
      'render': function() {
        var self  = this
          , model = self.model
          , $el   = self.$el = $(tpl)
          , $form = $el.find('form')

        $form.on('focus', '.error input', function() {
          $(this).closest('.control-group').removeClass('error')
        })

        $form.find('[name=name]').val(model.get('name'))
        $form.submit(function(e) {
          e.preventDefault()
          var password = $form.find('#inputPassword').val()

          if (password && $form.find('#verifyPassword').val() !== password) {
            // TODO: Error msg?
            $form.find('#verifyPassword')
                 .closest('.control-group')
                 .addClass('error')

            return
          }

          var data = { 'name': $form.find('[name=name]').val() }

          if (password) data.password = password

          model.save(data, {
            'error': function(user, response) {
              response = JSON.parse(response.responseText)

              // TODO: Shiny error handling
              if (response.error) alert(response.error.message)
            },
            'success': function() {
              $el.modal('hide')
            }
          })
        })
        $el.find('.save').click(function() { $form.submit() })

        $el.on('shown', function() {
          $form.find('[name=name]').focus()
        })
        $el.on('hide',   function() { self.trigger('close') })
        $el.on('hidden', function() { $(this).remove() })
        $el.modal()
      }
  })

  return UserEdit
})

