(function() {
  'use strict';

  angular
    .module('P1.auth', [
      'P1.authFactory',
      'P1.loginFactory',
      'P1.forgotPasswordDirective'
    ]);
})();