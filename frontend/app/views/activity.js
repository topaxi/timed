import Ember from 'ember'

export default Ember.View.extend({
  'setupDaterangePicker': function() {
    let options = {
      'startDate': this.get('controller.momentFrom')
    , 'endDate':   this.get('controller.momentTo')
    }

    this.$('.daterange').daterangepicker(options, (from, to) => {
      this.set('controller.momentFrom', from)
      this.set('controller.momentTo',   to)
    })
  }.on('didInsertElement')

, 'removeDaterangePicker': function() {
    let picker = this.$('.daterange').data('daterangepicker')

    if (picker) {
      picker.remove()
    }
  }.on('willDestroyElement')
})
