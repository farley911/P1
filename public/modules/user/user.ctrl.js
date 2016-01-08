(function() {
  'use strict'

  angular
    .module('P1.user')
    .controller('User', User);

  User.$inject = ['userFactory'];

  function User(userFactory) {
    // Properties
    var user = this;
    user.factory = userFactory;

    // Methods
    userFactory.activate();
  }
})();