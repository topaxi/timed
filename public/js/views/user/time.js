Timed.addStylesheet('jqueryui')
Timed.addStylesheet('daterangepicker')

define(['backbone', 'text!views/user/time.html', 'jqueryui', 'daterangepicker'],
    function(Backbone, tpl) {
  'use strict';

  var UserTime = Backbone.View.extend({
      'render': function() {
        var self  = this
          , model = self.model
          , $el   = self.$el = $(tpl)
          , $form = $el.find('form')

        $el.find('h3').text('Set Worktime for '+ self.model.get('name'))
        $el.find('.slider').slider({ 'max':   24
                                   , 'step':  .5
                                   , 'slide': updateTimeLabel
                                   })

        var today      = moment().startOf('day')
          , yesterday  = today.clone().subtract('days', 1)
          , $daterange = $el.find('.daterange').daterangepicker({
            'ranges': {
                'Today':        [today, today]
              , 'Yesterday':    [yesterday, yesterday]
              , 'Last 7 Days':  [moment().subtract('days', 6), today]
              , 'Last 30 Days': [moment().subtract('days', 29), today]
              , 'This Month':   [moment().date(1), moment(new Date(moment().year(), moment().month() + 1, 0))]
              , 'Last Month':   [moment().date(1).subtract('months', 1), moment().date(1).subtract('days', 1)]
            }
          , 'opens':     'left'
          , 'format':    'MM/DD/YYYY'
          , 'startDate': moment()
          , 'endDate':   moment().add('years', 1)
          , 'update':    updateDaterangeLabel
          , 'locale': {
              'applyLabel':       'Submit'
            , 'fromLabel':        'From'
            , 'toLabel':          'To'
            , 'customRangeLabel': 'Custom Range'
            , 'firstDay':         1
          }
        })

        $form.submit(function(e) {
          e.preventDefault()

          var wt    = model.get('worktime') || {}
            , range = $daterange.daterangepicker('getRange')
            , value
            , index

          for (var currentDate = range[0].clone(); currentDate < range[1]; currentDate.add('days', 1)) {
            value = $form.find('.slider').eq(currentDate.day()).slider('value')
            index = currentDate.format('YYYY-MM-DD')

            if (value > 0) {
              wt[index] = value
            }
            else if (wt[index]) {
              delete wt[index]
            }
          }

          model.save({ 'worktime': wt }, {
            'error': function(user, response) {
              response = JSON.parse(response.responseText)

              if (Timed.user.id == model.id) Timed.user.set('worktime', wt)

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
          //$form.find('[name=name]').focus()
        })
        $el.on('hide',   function() { self.trigger('close') })
        $el.on('hidden', function() { $(this).remove() })
        $el.modal()
      }
  })

  function updateTimeLabel(e, ui) {
    var value = ui.value % 1 ? ui.value : ui.value +'.0'

    $(this.parentNode).prev().text(value +'h')
  }

  function updateDaterangeLabel(start, end) {
    $('.daterange span').html(start.format('MMMM Do YYYY') + ' - ' + end.format('MMMM Do YYYY'))
  }

  return UserTime
})
