(function() {
  'use strict'

  angular
    .module('P1.userFactory', [])    
    .factory('userFactory', userFactory);

  userFactory.$inject = ['$http', '$q', 'sessionStorageFactory'];

  function userFactory($http, $q, sessionStorageFactory){
    var user = {
      getUser: getUser
    }

    return user;

    function getUser() {
      var user = sessionStorageFactory.getObj('user');
      var defered = $q.defer();

      if(!user) {
        $http.get('getUser')
          .then(function(currentUser) {
            sessionStorageFactory.setObj('user', currentUser.data.user);
            defered.resolve(currentUser.data.user);
          });
      } else {
        defered.resolve(user);
      }

      return defered.promise;
    }
  }
})();