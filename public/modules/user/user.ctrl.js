(function() {
  'use strict'

  angular
    .module('P1.user')
    .controller('User', User);

  User.$inject = ['userFactory'];

  function User(userFactory) {
    var user = this;
    user.factory = userFactory;

    userFactory.activate();
  }
})();