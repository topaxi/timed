define(['backbone', 'moment', 'text!views/attendance/edit.html'],
    function(Backbone, moment, tpl) {
  'use strict';

  var AttendanceEdit = Backbone.View.extend({
      'render': function() {
        var self    = this
          , model   = self.model
          , $el     = self.$el = $(tpl)
          , $form   = $el.find('form')
          , current = Timed.user.getCurrentAttendance()
          , end     = current && current.id == model.id
          , from    = model.get('from') || moment()
          , to      = model.get('to')   || moment()

        $form.find('[name=from]').val(from.format('LT'))
        $form.find('[name=to]')  .val(to  .format('LT'))

        $form.submit(function(e) {
          e.preventDefault()

          var now     = moment().format('L')
            , newFrom = moment(now +' '+ $form.find('[name=from]', 'LT').val())
            , newTo   = moment(now +' '+ $form.find('[name=to]',   'LT').val())

          model.set('from',
            from.seconds(0).minutes(newFrom.minutes()).hours(newFrom.hours()))
          model.set('to',
            to  .seconds(0).minutes(newTo  .minutes()).hours(newTo  .hours()))

          if (end)       Timed.user.endCurrentActivity()
          if (!model.id) Timed.user.get('attendances').add(model)

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
          $form.find('[name=to]').focus()
        })
        $el.on('hide',   function() { self.trigger('close') })
        $el.on('hidden', function() { $(this).remove() })
        $el.modal()
      }
  })

  return AttendanceEdit
})
