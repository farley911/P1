(function() {
  'use strict';

  angular
    .module('P1.auth', [
      'P1.authFactory',
      'P1.loginFactory',
      'P1.forgotPasswordDirective'
    ])
    // .run(function(authFactory) {
	   //  authFactory.checkAuth(); // Check is the user is logged in.
    //   authFactory.watchEmailParam(); // Watch $stateParam.email for changes so that it stays in sync.
    // });
})();