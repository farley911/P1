(function() {
  'use strict';

  angular
    .module('P1.auth', [
      'P1.authFactory',
      'P1.coreFactory'
    ])
    .run(function($rootScope, authFactory) {
      authFactory.scope = $rootScope; // Provide scope to auth factory.
	    authFactory.checkAuth(); // Check is the user is logged in.
    });
})();