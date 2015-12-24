(function() {
  'use strict'

  angular
    .module('P1.registrationFactory', [])    
    .factory('registrationFactory', registrationFactory);

  registrationFactory.$inject = ['$http', '$q', 'authFactory'];

  function registrationFactory($http, $q, authFactory){
    var registration = {
      register: register,
      doesUserExist: doesUserExist,
      checkUsername: checkUsername,
    }

    return registration;


    function register(user){
      return $http.post('register', user)
        .success(function(data){
          if(data.status === 200){
            authFactory.isLoggedIn = true;
          }
        });
    }


    function doesUserExist(email){
      var defered = $q.defer();
      $http.post('doesUserExist', email)
        .success(function(data){
          if(data.message !== 'user exists'){
            defered.resolve(false);
          } else {
            defered.resolve(true);
          }
        });
      return defered.promise;
    }

    function checkUsername(username) {
      var defered = $q.defer();
      $http.post('checkUsername', username)
        .success(function(data) {
          if(data.message === 'username available') {
            defered.resolve(true);
          } else {
            defered.resolve(false);
          }
        });
      return defered.promise;
    }
  }
})();