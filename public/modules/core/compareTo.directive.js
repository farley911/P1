(function() {
  'use strict';

  angular
    .module('P1.p1CompareToDirective', [])
    .directive('p1CompareTo', p1CompareTo);

  function p1CompareTo() {
    return {
      require: 'ngModel',
      scope: {
        otherModelValue: '=p1CompareTo'
      },
      link: function(scope, elem, attrs, ngModel) {
        ngModel.$validators.p1CompareTo = function(modelValue) {
          return modelValue == scope.otherModelValue;
        };

        scope.$watch('otherModelValue', function() {
          ngModel.$validate();
        });
      }
    }
  }
})();