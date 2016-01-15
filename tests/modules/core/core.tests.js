'use strict'

describe('Core Controller Tests', function () {
  var $controller, $scope, Core, coreFactory, closeModalSpy, openModalSpy;

  beforeEach(module('P1'));
  
  beforeEach(inject(function (_$controller_, _$rootScope_) {
    $controller = _$controller_;
    $scope = _$rootScope_;

    closeModalSpy = jasmine.createSpy('closeModal');
    openModalSpy = jasmine.createSpy('openModal');

    coreFactory = {
    	closeModal: closeModalSpy,
    	openModal: openModalSpy
    }

    // Init coreFactory controller with mocked services
    Core = $controller('Core', {
      $scope: $scope,
      coreFactory: coreFactory
    });

    // digest to update controller with services and scope
    $scope.$digest();
  }));

  describe('core.closeModal', function() {
	  it('should call coreFactory.closeModal', function() {
	  	Core.closeModal();
	  	expect(coreFactory.closeModal).toHaveBeenCalled();
	  });
  });

  describe('core.openModal', function() {
  	it('should call coreFactory.openModal', function() {
  		Core.openModal();
  		expect(coreFactory.openModal).toHaveBeenCalled();
  	});
  });
});