(function() {
  'use strict'
  
  angular
    .module('P1.auth')
    .controller('Auth', Auth);

  Auth.$inject = ['$scope', '$state', 'authFactory', 'coreFactory'];

  function Auth($scope, $state, authFactory, coreFactory) {
    // Properties
    var auth = this;
    auth.factory = authFactory;

    // Methods
    auth.forgotPassword = forgotPassword;
    auth.isLoggedIn = authFactory.isLoggedIn;
    auth.login = login,
    auth.logout = logout;
    auth.openLoginModal = openLoginModal;
    auth.updatePassword = updatePassword;

    function login() {
      authFactory.login()
        .then(function() {
          $state.go('secure.user');
        });
    }

    function logout() {
      authFactory.logout();
      $state.go('home');
    }

    function forgotPassword(email) {
      authFactory.forgotPassword(email);
    }

    function updatePassword() {
      authFactory.updatePassword()
        .then(function() {
          $state.go('secure.user');
        });
    }

    function openLoginModal () {
      coreFactory.openModal('modules/auth/views/login.html', 'Auth', 'auth');
    };
  }
})();