(function() {
  'use strict'

  angular
    .module('P1.forgotPasswordDirective', [])    
    .directive('forgotPasswordDirective', forgotPasswordDirective);

  function forgotPasswordDirective() {
    return {
      templateUrl: 'modules/auth/forgotPassword.html'

    }
  }
})();