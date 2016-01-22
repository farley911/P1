(function () {
  'use strict';

  angular
    .module('P1.core', [
      /* Include global providers */
      'P1.coreFactory',
      'P1.compareToDirective',
      'P1.sessionStorageFactory'
    ]);
})();