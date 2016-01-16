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
        email: $stateParams.email,
        username: '',
        password: '',
        c_password: ''
      },

      // Methods
      //activate: activate,
      checkAuth: checkAuth,
      forgotPassword: forgotPassword,
      login: login,
      logout: logout,
      updatePassword: updatePassword,
      watchEmailParam: watchEmailParam
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
      if(email) {
        auth.forgotPasswordFeedback = '';
        auth.forgotPasswordError = '';

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
    }

    function updatePassword() {
      var defered = $q.defer();

      $http.post('updatePassword', { email: auth.user.email, password: auth.user.password })
        .then(function(user) {
          auth.user = user.data;
          auth.login()
            .then(function() {
              defered.resolve();
            });
        })
        .catch(function (err) {
          defered.reject(err);
        });

      return defered.promise;
      // return $http.post('updatePassword', { email: auth.user.email, password: auth.user.password })
      //   .then(function(user) {
      //     auth.user = user.data;
      //     auth.checkAuth()
      //       .then(function() {
      //         return;
      //       });
      //   })
      //   .catch(function(err) {
      //     console.log('err', err);
      //   });
    }

    function watchEmailParam() {
      auth.scope.$watch(function() {
        return $stateParams.email
      }, function (newVal, oldVal) {
        if(oldVal !== newVal) {
          auth.user.email = newVal;
        }
      });
    }
  }
})();