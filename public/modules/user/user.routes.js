(function () {
  'use strict';

  angular
    .module('P1.user')
    .config(function ($stateProvider) {
      $stateProvider
        .state('secure.user', {
          controller: 'User',
          controllerAs: 'user',
          data: { 
            title: 'User Profile'
          },
          templateUrl: 'modules/user/user.html',
          url: '/user'
        });
    });
})();