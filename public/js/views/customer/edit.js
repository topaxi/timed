define(['backbone', 'text!views/customer/edit.html'], function(Backbone, tpl) {
  'use strict'

  var CustomerEdit = Backbone.View.extend({
      'render': function() {
        var model = this.model
          , $el   = this.$el = $(tpl)
          , $form = $el.find('form')

        $form.find('[name=name]').val(model.get('name'))
        $form.submit(function(e) {
          e.preventDefault()

          model.save({ 'name': $form.find('[name=name]').val() }, {
            'error': function(customer, response) {
              var response = JSON.parse(response.responseText)

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
        $el.on('hidden', function() { $(this).remove() })
        $el.modal()
      }
  })

  return CustomerEdit
})
