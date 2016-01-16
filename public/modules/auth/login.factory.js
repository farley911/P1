(function() {
  'use strict'

  angular
    .module('P1.loginFactory', [])    
    .factory('loginFactory', loginFactory);

  loginFactory.$inject = ['coreFactory'];

  function loginFactory(coreFactory) {
    var loginModal = { 
      openLoginModal: openLoginModal 
    };

    return loginModal;

	  function openLoginModal () {
      coreFactory.openModal('modules/auth/views/login.html', 'Auth', 'auth');
	  };
  }
})();