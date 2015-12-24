(function() {
  'use strict';

  angular
    .module('P1.registration')
    .config(function($stateProvider) {
      $stateProvider
        .state('register', {
          controller: 'Registration',
          controllerAs: 'reg',
          data: { title: 'Registration' },
          templateUrl: 'modules/registration/registration.html',
          url: '/register'
        });
    });
})();