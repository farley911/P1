'use strict'

describe('compareTo Directive Tests', function () {
  var $scope, inputModel, element, form;

  beforeEach(module('P1'));

  beforeEach(inject(function ($rootScope, $compile) {
    $scope = $rootScope;
    $scope.inputModel = {
      input1: '',
      input2: ''
    };
    element = angular.element(
      '<form name="inputForm">' + 
        '<input name="input1" ng-model="inputModel.input1" />' +
        '<input name="input2" ng-model="inputModel.input2" aly-compare-to="inputModel.input1" />' +
      '</form>'
    );
    $compile(element)($scope);
    form = $scope.inputForm;
  }));

  describe('alyCompareTo()', function () {
    it('should set $error.alyCompareTo to true if input1 and input2 dont match', function () {
      $scope.inputModel.input1 = 'foo';
      $scope.inputModel.input2 = 'bar';
      $scope.$digest();
      expect(form.input2.$error.alyCompareTo).toEqual(true);
    });

    it('should have an empty $error object if input1 and input2 match', function () {
      $scope.inputModel.input1 = 'foo';
      $scope.inputModel.input2 = 'foo';
      $scope.$digest();
      expect(form.input2.$error).toEqual({});
    });
  });
});