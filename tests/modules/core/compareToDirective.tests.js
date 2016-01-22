(function () {
  'use strict';

  describe('compareTo Directive Tests', function () {
    var $httpBackend, $scope, defer, element, form, inputModel, isLoggedInReqHandler;

    beforeEach(module('P1'));

    beforeEach(inject(function (_$httpBackend_, _$rootScope_, $compile, $q) {
      $httpBackend = _$httpBackend_;
      defer = $q.defer();
      $scope = _$rootScope_;
      $scope.inputModel = {
        input1: '',
        input2: ''
      };
      element = angular.element(
        '<form name="inputForm">' + 
          '<input name="input1" ng-model="inputModel.input1" />' +
          '<input name="input2" ng-model="inputModel.input2" compare-to="inputModel.input1" />' +
        '</form>'
      );
      $compile(element)($scope);
      form = $scope.inputForm;

      isLoggedInReqHandler = $httpBackend.when('GET', 'isLoggedIn').respond(defer.promise);
    }));

    describe('compareTo()', function () {
      it('should set $error.compareTo to true if input1 and input2 dont match', function () {
        $scope.inputModel.input1 = 'foo';
        $scope.inputModel.input2 = 'bar';
        $scope.$digest();
        expect(form.input2.$error.compareTo).toEqual(true);
      });

      it('should have an empty $error object if input1 and input2 match', function () {
        $scope.inputModel.input1 = 'foo';
        $scope.inputModel.input2 = 'foo';
        $scope.$digest();
        expect(form.input2.$error).toEqual({});
      });
    });
  });
})();