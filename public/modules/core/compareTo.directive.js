(function() {
  'use strict';

  angular
    .module('P1.alyCompareToDirective', [])
    .directive('alyCompareTo', alyCompareTo);

  function alyCompareTo() {
    return {
      require: 'ngModel',
      scope: {
        otherModelValue: '=alyCompareTo'
      },
      link: function(scope, elem, attrs, ngModel) {
        ngModel.$validators.alyCompareTo = function(modelValue) {
          return modelValue == scope.otherModelValue;
        };

        scope.$watch('otherModelValue', function() {
          ngModel.$validate();
        });
      }
    }
  }
})();