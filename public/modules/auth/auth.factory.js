(function() {
  'use strict'

  angular
    .module('P1.authFactory', [])    
    .factory('authFactory', authFactory);

  authFactory.$inject = ['$http', '$q', 'sessionStorageFactory'];

  function authFactory($http, $q, sessionStorageFactory){
    var auth = {
      // properties
      errMsg: '',
      hasErrMsg: false,
      isLoggedIn: false,
      scope: null,

      // methods
      activate: activate,
      checkAuth: checkAuth,
      forgotPassword: forgotPassword,
      login: login,
      logout: logout,
      updatePassword: updatePassword
    };

    return auth;

    function activate() {
      auth.checkAuth(); // Check is the user is logged in.
    }

    function login(user){
      return $http.post('login', user)
        .success(function(data){
          auth.isLoggedIn = true;
          if(auth.scope.$close) auth.scope.$close();
        })
        .error(function() {
          auth.hasErrMsg = true;
          auth.errMsg = 'Incorrect password.';
          auth.$dismiss;
        });
    }

    function logout(){
      $http.get('logout')
        .success(function(){
          auth.isLoggedIn = false;
          sessionStorageFactory.remove('user');
        });
    }

    function checkAuth(){
      return $http.get('isLoggedIn')
        .success(function(data) {
          if(!data.isLoggedIn && sessionStorageFactory.getObj('user')) {
            sessionStorageFactory.remove('user');
          }
          auth.isLoggedIn = data.isLoggedIn;    
        });
    }

    function forgotPassword(email) {
      var defered = $q.defer();

      $http({
        method: 'POST',
        url: '/forgotPassword.php',
        data: $.param(email),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .success(function (data) {
        defered.resolve(data);
      });

      return defered.promise;
    }

    function updatePassword(user) {
      return $http.post('updatePassword', user);
    }
  }
})();