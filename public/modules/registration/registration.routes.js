(function () {
  'use strict';

  angular
    .module('P1.registration')
    .config(function ($stateProvider) {
      $stateProvider
        .state('register', {
          controller: 'Registration',
          controllerAs: 'reg',
          data: { 
            title: 'Registration' 
          },
          templateUrl: 'modules/registration/views/registration.html',
          url: '/register'
        });
    });
})();