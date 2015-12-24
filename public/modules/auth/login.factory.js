(function() {
  'use strict'

  angular
    .module('P1.loginFactory', [])    
    .factory('loginFactory', loginFactory);

  loginFactory.$inject = ['$modal'];

  function loginFactory($modal) {
    var loginModal = { openLoginModal: openLoginModal };

    return loginModal;

	  function openLoginModal () {
	    var instance = $modal.open({
	      templateUrl: 'modules/auth/login.html',
	      controller: 'Auth',
	      controllerAs: 'auth'
	    })

	    return instance.result;
	  };
  }
})();