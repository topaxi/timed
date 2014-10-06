define(['backbone', 'text!views/customer/edit.html'], function(Backbone, tpl) {
  'use strict';

  var CustomerEdit = Backbone.View.extend({
      'render': function() {
        var self  = this
          , model = self.model
          , $el   = self.$el = $(tpl)
          , $form = $el.find('form')

        $form.find('[name=name]').val(model.get('name'))
        $form.submit(function(e) {
          e.preventDefault()

          model.save({ 'name': $form.find('[name=name]').val() }, {
            'error': function(customer, response) {
              response = JSON.parse(response.responseText)

              // TODO: Shiny error handling
              if (response.error) alert(response.error.message)
            },
            'success': function() {
              self.collection.add(model)
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

  return CustomerEdit
})
