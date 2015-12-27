'use strict'

describe('User Controller Tests', function () {
	var $controller, $scope, defer, userFactory, activateSpy, getUserSpy, User;

	beforeEach(module('P1'));

	beforeEach(inject(function (_$controller_, _$rootScope_, $q) {
		$controller = _$controller_;
		$scope = _$rootScope_;
    defer = $q.defer();

    // Create spies
    activateSpy = jasmine.createSpy('activate').and.returnValue(defer.promise);
		getUserSpy = jasmine.createSpy('getUser').and.returnValue(defer.promise);

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