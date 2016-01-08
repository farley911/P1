(function() {
  'use strict'

  angular
    .module('P1.registrationFactory', [])    
    .factory('registrationFactory', registrationFactory);

  registrationFactory.$inject = ['$http', 'authFactory'];

  function registrationFactory($http, authFactory){
    var registration = {
      // Properties
      error: '',
      regForm: null,
      user: {
        username: '',
        email: '',
        password: '',
        c_password: '',
        first_name: '',
        last_name: ''
      },

      // Methods
      register: register,
      doesUserExist: doesUserExist,
      checkUsername: checkUsername,
    }

    return registration;


    function register(user){
      return $http.post('register', registration.user)
        .then(function(data){
          /* istanbul ignore else*/
          if(data.status === 200){
            authFactory.isLoggedIn = true;
          }
        })
        .catch(function(err) {
          registration.error = err.data;
        });
    }

    function doesUserExist(){
      var email = registration.regForm.email;
      if(email.$valid) {
        $http.post('doesUserExist', { email: registration.user.email })
          .success(function(data){
            if(data.message !== 'user exists'){
              email.$setValidity('userExists', true); // Valid
            } else {
              email.$setValidity('userExists', false); // Not valid
            }
          });
      } else { // Input is invalid for reasons other than existing email, do not delete ~ EFarley 9/23/15
        email.$setValidity('userExists', true); // Remove userExists validation error.
      }
    }

    function checkUsername() {
      var username = registration.regForm.username;
      if(username.$valid) {
        $http.post('checkUsername', { username: registration.user.username })
          .success(function(data) {
            if(data.message === 'username available') {
              username.$setValidity('usernameTaken', true); // username is available
            } else {
              username.$setValidity('usernameTaken', false); // username is taken
            }
          });
      } else { // Input is invalid for reasons other than existing email, do not delete ~ EFarley 9/23/15
        username.$setValidity('usernameTaken', true); // Remove usernameTaken validation error.
      }
    }
  }
})();