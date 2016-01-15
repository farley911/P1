'use strict'

describe('User Controller Tests', function () {
	var $controller, $httpBackend, $scope, defer, isLoggedInReqHandler, userFactory, activateSpy, getUserSpy, User;

	beforeEach(module('P1'));

	beforeEach(inject(function (_$controller_, _$httpBackend_, _$rootScope_, $q) {
		$controller = _$controller_;
    $httpBackend = _$httpBackend_
		$scope = _$rootScope_;
    defer = $q.defer();

    // Create spies
    activateSpy = jasmine.createSpy('activate').and.returnValue(defer.promise);
		getUserSpy = jasmine.createSpy('getUser').and.returnValue(defer.promise);

    isLoggedInReqHandler = $httpBackend.when('GET', 'isLoggedIn').respond(defer.promise);

		userFactory = {
      activate: activateSpy,
			getUser: getUserSpy
		};

		// Init userFactory controller with mocked services and scope
    User = $controller('User', {
      userFactory: userFactory
    });

    // digest to update controller with services and scope
    $scope.$digest();

    defer.resolve({
      first_name: 'Bruce',
      last_name: 'Wayne'
    });
    $scope.$apply();
	}));

  it('should call userFactory.activate()', function() {
    expect(userFactory.activate).toHaveBeenCalled();
  });
});