(function () {
  'use strict';

  describe('Core Controller Tests', function () {
    var $controller, $httpBackend, $scope, Core, coreFactory, closeModalSpy, defer, isLoggedInReqHandler, openModalSpy;

    beforeEach(module('P1'));
    
    beforeEach(inject(function (_$controller_, _$httpBackend_, _$rootScope_, $q) {
      $controller = _$controller_;
      $httpBackend = _$httpBackend_;
      $scope = _$rootScope_;
      defer = $q.defer();

      closeModalSpy = jasmine.createSpy('closeModal');
      openModalSpy = jasmine.createSpy('openModal');

      isLoggedInReqHandler = $httpBackend.when('GET', 'isLoggedIn').respond(defer.promise);

      coreFactory = {
        closeModal: closeModalSpy,
        openModal: openModalSpy
      };

      // Init coreFactory controller with mocked services
      Core = $controller('Core', {
        $scope: $scope,
        coreFactory: coreFactory
      });

      // digest to update controller with services and scope
      $scope.$digest();
    }));

    describe('core.closeModal', function () {
      it('should call coreFactory.closeModal', function () {
        Core.closeModal();
        expect(coreFactory.closeModal).toHaveBeenCalled();
      });
    });

    describe('core.openModal', function () {
      it('should call coreFactory.openModal', function () {
        Core.openModal();
        expect(coreFactory.openModal).toHaveBeenCalled();
      });
    });
  });
})();