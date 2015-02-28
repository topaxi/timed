import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  init: function() {
    this.set('from', moment().startOf('month'))
    this.set('to',   moment().endOf('month'))
  }
, weekdays: function() {
    return moment.weekdays()
  }.property()
, actions: {
    submit: function() {
      let wt       = this.model.get('worktime') || {}
      let $sliders = Ember.$('.ui-slider') // TODO: We shouldn't access DOM stuff from our controller...

      moment.range(this.get('from'), this.get('to')).by('days', day => {
        let value = $sliders.eq(day.day()).slider('value')
        let index = day.format('YYYY-MM-DD')

        wt[index] = value > 0 ? value : undefined
      })

      this.model.set('worktime', wt)

      this.model.save().then(() =>
        this.notify.success(`Worktime for ${this.model.get('name')} saved!`)
      )
    }
  }
})
