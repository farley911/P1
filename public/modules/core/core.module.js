(function() {
  'use strict'

  angular
    .module('P1.core', [
      /* Include global providers */
      'P1.coreFactory',
      'P1.p1CompareToDirective',
      'P1.sessionStorageFactory'
    ]);
})();