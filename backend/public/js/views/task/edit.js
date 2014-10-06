Timed.addStylesheet('datepicker')

define(['backbone', 'moment', 'text!views/task/edit.html', 'datepicker'],
    function(Backbone, moment, tpl) {
  'use strict';

  var def = moment().format('L')

  var TaskEdit = Backbone.View.extend({
      'render': function() {
        var self  = this
          , model = self.model
          , $el   = self.$el = $(tpl)
          , $form = $el.find('form')
          , from  = model.get('from')
          , to    = model.get('to')

        // TODO: Either i'm doing it wrong or the datepicker api seems weird
        $form.find('[name=from]').val(from ? from.format('L') : '')
                                 .closest('.date')
                                 .data('date', from ? from.format('L') : '')

        $form.find('[name=to]').val(to ? to.format('L') : '')
                               .closest('.date')
                               .data('date', to ? to.format('L') : '')

        $form.find('.date').datepicker({ 'weekStart': 1, 'format': 'mm/dd/yyyy' })

        $form.find('[name=name]').val(model.get('name'))
        $form.find('[name=done]').prop('checked', model.get('done'))

        if (model.get('priority')) {
          $form.find('[name=priority]').val(model.get('priority'))
        }

        $form.submit(function(e) {
          e.preventDefault()

          var data = { 'name':     $form.find('[name=name]').val()
                     , 'duration': parseInt($form.find('[name=duration]').val(), 10) || null
                     , 'from':     moment($form.find('[name=from]').val())
                     , 'to':       moment($form.find('[name=to]')  .val())
                     , 'priority': $form.find('[name=priority]').val() >>> 0
                     , 'done':     $form.find('[name=done]').prop('checked')
                     }

          model.save(data, {
            'error': function(model, response) {
              response = JSON.parse(response.responseText)

              // TODO: Shiny error handling
              if (response.error) alert(response.error.message)
            },
            'success': function() {
              Timed.tasks.add(model)
              $el.modal('hide')
            }
          })
        })
        $el.find('.save')  .click(function() { $form.submit() })
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

  return TaskEdit
})
