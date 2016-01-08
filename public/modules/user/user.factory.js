(function() {
  'use strict'

  angular
    .module('P1.userFactory', [])    
    .factory('userFactory', userFactory);

  userFactory.$inject = ['$http', '$q', 'sessionStorageFactory'];

  function userFactory($http, $q, sessionStorageFactory){
    var user = {
      // Properties
      data: {
        name: ''
      },

      // Methods
      activate: activate,
      getUser: getUser
    }

    return user;

    function activate() {
      user.getUser()
        .then(function(currentUser) {
          user.data.name = currentUser.first_name + ' ' + currentUser.last_name;
        });
    }

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