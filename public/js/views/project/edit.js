;(function(document) {
  'use strict';

  if (document.getElementById('datepicker-stylesheet')) {
    return
  }

  var link = document.createElement('link')

  link.id = 'datepicker-stylesheet'
  link.rel = 'stylesheet'
  link.href = '/bootstrap-datepicker/css/datepicker.css'

  document.head.appendChild(link)
})(document)

define(['backbone', 'collections/customer', 'moment', 'text!views/project/edit.html', '/bootstrap-datepicker/js/bootstrap-datepicker.js'],
    function(Backbone, Customers, moment, tpl) {
  'use strict';

  var def = moment().format('L')

  var ProjectEdit = Backbone.View.extend({
      'render': function() {
        var self      = this
          , model     = self.model
          , $el       = self.$el = $(tpl)
          , $form     = $el.find('form')
          , customers = new Customers

        customers.fetch({ 'success': function() {
          var $select = $form.find('#inputCustomer')
            , selected = model.get('customer')

          selected = selected && selected.id || selected

          customers.each(function(customer) {
            var $option = $('<option value="'+ customer.id +'">').text(customer.get('name'))

            if (selected == customer.id) $option.prop('selected', true)

            $select.append($option)
          })
        } })

        // TODO: Either i'm doing it wrong or the datepicker api seems weird
        $form.find('[name=from]').val(model.get('from').format('L'))
                                 .closest('.date')
                                 .data('date', model.get('from').format('L'))

        $form.find('[name=to]').val(model.get('to').format('L'))
                               .closest('.date')
                               .data('date', model.get('to').format('L'))

        // TODO: format should be localized
        $form.find('.date').datepicker({ 'weekStart': 1, 'format': 'mm/dd/yyyy' })

        $form.find('[name=name]').val(model.get('name'))
        $form.find('[name=done]').prop('checked', model.get('done'))
        $form.submit(function(e) {
          e.preventDefault()

          var data = { 'name':     $form.find('[name=name]').val()
                     , 'customer': $form.find('[name=customer]').val()
                     , 'from':     moment($form.find('[name=from]').val())
                     , 'to':       moment($form.find('[name=to]')  .val())
                     , 'done':     $form.find('[name=done]').prop('checked')
                     }

          model.save(data, {
            'error': function(model, response) {
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
        $el.find('.delete').click(function() {
          model.destroy({
            'error': function(model, response) {
                response = JSON.parse(response.responseText)

                // TODO: Shiny error handling
                if (response.error) alert(response.error.message)
              }
            , 'success': function() {
                $el.modal('hide')
              }
          })
        })

        $el.on('shown', function() {
          $form.find('[name=name]').focus()
        })
        $el.on('hide',   function() { self.trigger('close') })
        $el.on('hidden', function() { $(this).remove() })
        $el.modal()
      }
  })

  return ProjectEdit
})
