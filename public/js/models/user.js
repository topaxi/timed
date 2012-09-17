define(['backbone'], function(Backbone) { 'use strict'
  var User = Backbone.Model.extend({
      'url': function() {
               var url = '/user'

               if (this.id) url += '/'+ this.id

               return url
             }
    , 'idAttribute': '_id'
    , 'parse': function(res) {
                 res.attendances.forEach(convertDates)

                 return res
               }
    , 'getCurrentAttendance': function() {
        var attendances = this.get('attendances')

        return attendances[attendances.length - 1]
      }
  })

  function convertDates(a) {
    var parsed

    parsed = Date.parse(a.from)
    a.from = parsed ? new Date(parsed) : null

    parsed = Date.parse(a.to)
    a.to   = parsed ? new Date(parsed) : null
  }

  return User
})
