(function() {
  'use strict'
  
  angular
    .module('P1.auth')
    .controller('Auth', Auth);

  Auth.$inject = ['$scope', '$state', '$stateParams', 'authFactory', 'loginFactory', 'sessionStorageFactory'];

  function Auth($scope, $state, $stateParams, authFactory, loginFactory, sessionStorageFactory) {
    // Properties
    var auth = this;
    auth.factory = authFactory;
    auth.hasFlash = true;
    auth.resetPassword = {
      email: $stateParams.email,
      password: '',
      c_password: '',
      feedback: ''
    };
    auth.user = {};

    // Methods
    auth.forgotPassword = forgotPassword;
    auth.isLoggedIn = authFactory.isLoggedIn;
    auth.login = login,
    auth.logout = logout;
    auth.openLoginModal = loginFactory.openLoginModal;
    auth.updatePassword = updatePassword;

    // Config
    authFactory.scope = $scope;
    authFactory.activate();

    function login() {
      authFactory.login(auth.user)
        .then(function() {
          $state.go('secure.user');
        });
    }

    function logout() {
      authFactory.logout();
      $state.go('home');
    }

    function forgotPassword(email) {
      if(email) {
        authFactory.forgotPassword({ email: email })
          .then(function(res) {
            auth.resetPassword.feedback = res.message;
            $('#forgotPassword').modal();
          });
      }
    };
    
    function updatePassword() {
      authFactory.updatePassword(auth.resetPassword)
        .then(function(res) {
          auth.user = res.data;
          auth.login();
        });
    };
  }
})();