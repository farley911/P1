(function() {
  'use strict'

  angular
    .module('P1.authFactory', [])    
    .factory('authFactory', authFactory);

  authFactory.$inject = ['$http', '$q', '$stateParams', 'coreFactory', 'sessionStorageFactory'];

  function authFactory($http, $q, $stateParams, coreFactory, sessionStorageFactory){
    var auth = {
      // Properties
      errMsg: '',
      forgotPasswordError: false,
      forgotPasswordFeedback: '',
      hasErrMsg: false,
      isLoggedIn: false,
      scope: null,
      user: {
        email: null,
        username: null,
        password: null,
        c_password: null
      },

      // Methods
      //activate: activate,
      checkAuth: checkAuth,
      forgotPassword: forgotPassword,
      login: login,
      logout: logout,
      updatePassword: updatePassword
    };

    return auth;

    function login(){
      return $http.post('login', auth.user)
        .then(function(data){
          auth.isLoggedIn = true;
          coreFactory.closeModal();
        })
        .catch(function() {
          auth.hasErrMsg = true;
          auth.errMsg = 'Incorrect password.';
          auth.$dismiss;
        });
    }

    function logout(){
      $http.get('logout')
        .then(function(){
          auth.isLoggedIn = false;
          sessionStorageFactory.remove('user');
        });
    }

    function checkAuth(){
      var defered = $q.defer();

      $http.get('isLoggedIn')
        .then(function(res) {
          if(!res.data.isLoggedIn && sessionStorageFactory.getObj('user')) {
            sessionStorageFactory.remove('user');
          }
          auth.isLoggedIn = res.data.isLoggedIn;
          defered.resolve();
        });

      return defered.promise;
    }

    function forgotPassword(email) {
      $http.post('forgotPassword', { email: email })
        .then(function (res) {
          auth.forgotPasswordFeedback = res.data.message;
        })
        .catch(function (err) {
          auth.forgotPasswordError = err.data.message;
        })
        .finally(function () {
          coreFactory.openModal('modules/auth/views/forgotPassword.html', 'Auth', 'auth');
        });
    }

    function updatePassword() {
      return $http.post('updatePassword', { email: auth.user.email, password: auth.user.password })
        .then(function(user) {
          auth.user = user.data;
          return auth.login();
        });
    }
  }
})();