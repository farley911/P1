(function() {
  'use strict'

  angular
    .module('P1.core', [
      /* Include global providers */
      'P1.alyCompareToDirective',
      'P1.sessionStorageFactory'
    ]);
})();