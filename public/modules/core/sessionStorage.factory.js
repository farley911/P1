(function() {
  'use strict'

  angular
    .module('P1.sessionStorageFactory', [])    
    .factory('sessionStorageFactory', sessionStorageFactory);

  sessionStorageFactory.$inject = ['$window'];

  function sessionStorageFactory($window) {
    var sessionStorageFactory = {
      set: set,
      get: get,
      setObj: setObj,
      getObj: getObj,
      remove: remove
    }

    return sessionStorageFactory;

    function set(key, value) {
      $window.sessionStorage[key] = value;
    }

    function get(key, defaultValue) {
      return $window.sessionStorage[key] || defaultValue;
    }

    function setObj(key, value) {
      $window.sessionStorage[key] = JSON.stringify(value);
    }

    function getObj(key) {
      return $window.sessionStorage[key] ? JSON.parse($window.sessionStorage[key]) : null;
    }

    function remove(key){
      $window.sessionStorage.removeItem(key);
      console.log('Session "' + key + '" has been removed.');
    }
  }
})();