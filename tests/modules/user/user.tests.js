'use strict'

describe('User Controller Tests', function () {
	var $controller, $scope, defer, userFactory, getUserSpy, User;

	beforeEach(module('P1'));

	beforeEach(inject(function (_$controller_, _$rootScope_, $q) {
		$controller = _$controller_;
		$scope = _$rootScope_;
    defer = $q.defer();

    // Create spies
		getUserSpy = jasmine.createSpy('getUser').and.returnValue(defer.promise);

		userFactory = {
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

	it('should have User.name equal to Bruce Wayne', function () {
		expect(User.name).toEqual('Bruce Wayne');
	});

  it('should call userFactory.getUser()', function() {
    expect(userFactory.getUser).toHaveBeenCalled();
  });
});