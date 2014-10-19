import Ember from 'ember';
import moment from 'moment';

var ICON = '<span class="input-group-addon pointer"><i class="glyphicon glyphicon-calendar"></i></span>'

export default Ember.TextField.extend({
  'readonly':   true
, 'date':       null
, 'format':     'YYYY-MM-DD'
, 'classNames': [ 'form-control', 'pointer' ]
, 'options':    { 'autoclose': true, 'todayHighlight': true, 'format': 'yyyy-mm-dd' }
, 'updateValue': function() {
    var date = this.get('date')

    if (!date || !date.isValid()) {
      return this.set('value', null)
    }

    this.set('value', date.format(this.format))
  }.observes('date')
, 'updateDate': function() {
    var date = moment.utc(this.get('value'), this.format).startOf('day')

    if (!date.isValid()) {
      return this.set('date', null)
    }

    this.set('date', date)
  }.observes('value')
, 'updatePicker': function() {
    var date = this.get('date')

    if (date && date.isValid()) {
      this.$().datepicker('update', date.toDate())
    }
  }.observes('date')
, 'didInsertElement': function() {
    var $datepicker = this.$().datepicker(Ember.$.extend({}, this.options))
      , $icon       = Ember.$(ICON)

    $icon.click(() => $datepicker.focus())

    $datepicker.wrap('<div class="input-group">').after($icon)
    $datepicker.on('changeDate', () => this.updateDate())

    this.updateValue()
  }
})
