(function() {
  'use strict';

  angular
    .module('P1.compareToDirective', [])
    .directive('compareTo', compareTo);

  function compareTo() {
    return {
      require: 'ngModel',
      scope: {
        otherModelValue: '=compareTo'
      },
      link: function(scope, elem, attrs, ngModel) {
        ngModel.$validators.compareTo = function(modelValue) {
          return modelValue == scope.otherModelValue;
        };

        scope.$watch('otherModelValue', function() {
          ngModel.$validate();
        });
      }
    }
  }
})();