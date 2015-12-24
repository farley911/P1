(function() {
  'use strict';

  angular
    .module('P1.home')
    .config(function($stateProvider) {
      $stateProvider
        .state('home', {
          data: { title: 'Home' },
          templateUrl: 'modules/home/home.html',
          url: '/home'
        });
    });
})();