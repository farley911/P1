(function() {
  'use strict';

  angular
    .module('P1.auth')
    .config(function($stateProvider) {
      $stateProvider
        .state('resetPassword', {
          controller: 'Auth',
          controllerAs: 'auth',
          data: { title: 'Reset Password' },
          templateUrl: 'modules/auth/resetPassword.html',
          url: '/resetPassword/:email'
        });
    });
})();