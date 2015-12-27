(function() {
  'use strict'

  angular
    .module('P1.registration')
    .controller('Registration', Registration);

  Registration.$inject = ['$state', 'registrationFactory'];

  function Registration($state, registrationFactory) {
    // Properties
    var reg = this;
    reg.factory = registrationFactory;

    // Methods
    reg.alreadyRegistered = alreadyRegistered;
    reg.checkUsername = checkUsername;
    reg.register = register;

    function register() {
      registrationFactory.register()
        .then(function(){
          $state.go('secure.user'); 
        });
    };

    function alreadyRegistered() {
      registrationFactory.doesUserExist();
    };

    function checkUsername() {
      registrationFactory.checkUsername();
    };
  }
})();