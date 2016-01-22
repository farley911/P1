(function () {
  'use strict';

  describe('Core Factory Tests', function () {
    var uibModal, coreFactory, modalMock, closeSpy, openSpy;

    beforeEach(module('P1'));

    beforeEach(inject(function (_$uibModal_, $injector) {
      coreFactory = $injector.get('coreFactory');
      openSpy = jasmine.createSpy('open');
      uibModal = _$uibModal_;
      uibModal.open = openSpy;
      coreFactory = $injector.get('coreFactory');
    }));

    describe('coreFactory.closeModal', function () {
      beforeEach(function () {
        closeSpy = jasmine.createSpy('close');
        modalMock = {
          close: closeSpy,
        };
        coreFactory.modal = modalMock;
      });

      it('should call Core.modal.close', function () {
        coreFactory.closeModal();
        expect(coreFactory.modal.close).toHaveBeenCalled();
      });
    });

    describe('coreFactory.openModal', function () {
      it('should call $ubiModal.open', function () {
        coreFactory.openModal('modules/auth/login.html', 'Auth', 'auth');
        expect(uibModal.open).toHaveBeenCalled();
      });
    });
  });
})();