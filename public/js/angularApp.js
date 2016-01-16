(function() {
  'use strict';

  // Declare app level module which depends on filters, and services

  angular
    .module('P1', [
      'ui.bootstrap', 
      'ui.router', 
      'P1.app'
    ])
    .config(function ($stateProvider, $locationProvider, $provide, $urlRouterProvider) {
      var isUserLoggedIn = function($state, coreFactory, authFactory) {
        authFactory.checkAuth()
          .then(function() {
            if(!authFactory.isLoggedIn) {
              return coreFactory.openLoginModal() // If the user isn't logged in display the login modal so they can log in.
                .then(function() {
                  return $state.go($state.next.name, $state.toParams); // If they successfully log in send them to the page they requested.
                }, function() {
                  return $state.go('home'); // If they are unable to log in send them back to the index page.
                });
            }
          });
        
      };

      // Decorator needed to route users back to the page they were attempting to access when login modal was displayed.
      $provide.decorator('$state', function($delegate, $rootScope) {
        $rootScope.$on('$stateChangeStart', function(event, state, params) {
          $delegate.next = state;
          $delegate.toParams = params;
        });
        return $delegate;
      });

      $stateProvider
        .state('secure', {
          abstract: true,
          template: '<ui-view/>',
          resolve: {
            loggedin: isUserLoggedIn // Pause the page transition before secure content loads to check if the user is logged in or not.
          }
        })

      $locationProvider.html5Mode(true);
      $urlRouterProvider.otherwise('home');
    })
    .run(function ($rootScope, authFactory) {
      $rootScope.$on('$stateChangeStart', function(event, toState) {
        if(toState.data && toState.data.title) {
          $rootScope.pageTitle = '- ' + toState.data.title;
        } else {
          $rootScope.pageTitle = '';
        }
        authFactory.checkAuth();
      });
    });
})();