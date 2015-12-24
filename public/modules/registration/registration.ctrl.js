(function() {
  'use strict'

  angular
    .module('P1.registration')
    .controller('Registration', Registration);

  Registration.$inject = ['$state', 'registrationFactory'];

  function Registration($state, registrationFactory) {
    var reg = this;

    reg.alreadyRegistered = alreadyRegistered;
    reg.checkUsername = checkUsername;
    reg.error = '';
    reg.register = register;
    reg.user = {};

    function register() {
      registrationFactory.register(reg.user)
        .then(function(res){
          $state.go('secure.user'); 
        })
        .catch(function(err){
          reg.error = err;
        });
    };

    function alreadyRegistered() {
      if(reg.regForm.email.$valid){
        registrationFactory.doesUserExist({ email: reg.user.email })
          .then(function(res){
            if(res) {
              reg.regForm.email.$setValidity('userExists', false); // Not valid
            } else {
              reg.regForm.email.$setValidity('userExists', true); // Valid
            }
          })
          .catch(function(err){
            reg.error = err;
          });
      } else { // Input is invalid for reasons other than existing email, do not delete ~ EFarley 9/23/15
        reg.regForm.email.$setValidity('userExists', true); // Remove userExists validation error.
      }
    };

    function checkUsername() {
      if(reg.user.username) {
        registrationFactory.checkUsername({ username: reg.user.username })
          .then(function(usernameAvailable) {
            if(usernameAvailable) {
              reg.regForm.username.$setValidity('usernameTaken', true); // username is available
            } else {
              reg.regForm.username.$setValidity('usernameTaken', false); // username is taken
            }
          });
      }
    };
  }
})();