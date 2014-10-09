import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var users = this.store.find('user')
    users.then(function(users) { console.log(users) })
    return users
  }
});
