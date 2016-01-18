import DS    from 'ember-data'
import Model from './model'

export default Model.extend({
  'name':  DS.attr('string')
})
