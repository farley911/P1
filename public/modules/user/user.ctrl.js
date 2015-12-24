(function() {
  'use strict'

  angular
    .module('P1.user')
    .controller('User', User);

  User.$inject = ['userFactory'];

  function User(userFactory) {
    var user = this;

    userFactory.getUser()
      .then(function(currentUser) {
        user.name = currentUser.first_name + ' ' + currentUser.last_name;
      })
  }
})();