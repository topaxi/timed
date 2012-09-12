!function(document) {
  var link = document.createElement('link')

  link.rel = 'stylesheet'
  link.href = '/bootstrap-datepicker/css/datepicker.css'

  document.head.appendChild(link)
}(document)

define(['backbone', 'text!views/project/edit.html', '/bootstrap-datepicker/js/bootstrap-datepicker.js'], function(Backbone, tpl) {
  'use strict'

  var dateFormat = 'dd.mm.yyyy'
    , def        = Timed.formatDate(new Date)

  var ProjectEdit = Backbone.View.extend({
      'render': function() {
        var model = this.model
          , $el   = this.$el = $(tpl)
          , $form = $el.find('form')

        // TODO: Either i'm doing it wrong or the datepicker api seems weird
        $form.find('[name=from]').val(Timed.formatDate(model.get('from')))
                                 .closest('.date')
                                 .data('date', Timed.formatDate(model.get('from')))

        $form.find('[name=to]').val(Timed.formatDate(model.get('to')))
                               .closest('.date')
                               .data('date', Timed.formatDate(model.get('to')))

        $form.find('.date').datepicker({ 'weekStart': 1, 'format': dateFormat })

        $form.find('[name=name]').val(model.get('name'))
        $form.find('[name=done]').prop('checked', model.get('done'))
        $form.submit(function(e) {
          e.preventDefault()

          var data = { 'name': $form.find('[name=name]').val()
                     , 'from': parseDate($form.find('[name=from]').val())
                     , 'to':   parseDate($form.find('[name=to]')  .val())
                     , 'done': $form.find('[name=done]').prop('checked')
                     }

          model.save(data, {
            'error': function(project, response) {
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

  function parseDate(str) {
    var parts = str.split('.')

    return new Date(parts[2], parts[1] - 1, parts[0])
  }

  return ProjectEdit
})
