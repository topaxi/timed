define(['backbone', 'moment', 'text!views/activity/edit.html'],
    function(Backbone, moment, tpl) {
  'use strict';

  var ActivityEdit = Backbone.View.extend({
      'render': function() {
        var self    = this
          , model   = self.model
          , $el     = self.$el = $(tpl)
          , $form   = $el.find('form')
          , $select = $form.find('#inputTask')
          , from    = model.get('from') || moment()
          , to      = model.get('to')   || moment()

        Timed.tasks.forEach(function(task) {
          var $option = $('<option>')

          $option.val(task.id).text(task.get('name'))

          $select.append($option)
        })

        $form.find('#inputFrom').val(from.format('LT'))
        $form.find('#inputTo')  .val(to  .format('LT'))
        $form.find('#inputTask').val(model.get('task'))

        $form.submit(function(e) {
          e.preventDefault()

          var now     = moment().format('L')
            , newFrom = moment(now +' '+ $form.find('#inputFrom', 'LT').val())
            , newTo   = moment(now +' '+ $form.find('#inputTo',   'LT').val())

          model.set('from',
            from.seconds(0).minutes(newFrom.minutes()).hours(newFrom.hours()))
          model.set('to',
            to  .seconds(0).minutes(newTo  .minutes()).hours(newTo  .hours()))
          model.set('task', $form.find('#inputTask').val())
          console.log($form.find('#inputTask').val())

          Timed.user.save({}, {
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
        $el.find('.save')  .click(function() { $form.submit() })
        $el.find('.delete').click(function() {
          Timed.user.get('attendances').remove(model)
          Timed.user.save({}, {
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

        $el.on('shown', function() {
          $form.find('#inputTask').focus()
        })
        $el.on('hide',   function() { self.trigger('close') })
        $el.on('hidden', function() { $(this).remove() })
        $el.modal()
      }
  })

  return ActivityEdit
})
