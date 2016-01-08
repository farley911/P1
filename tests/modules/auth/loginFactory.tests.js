'use strict'

describe('Login Factory Tests', function() {
  var modal, loginFactory;

  beforeEach(module('P1'));

  beforeEach(inject(function($injector, _$uibModal_) {
    modal = _$uibModal_;
    loginFactory = $injector.get('loginFactory');
  }));

  describe('loginFactory.openLoginModal()', function () {
    it('should call coreFactory.openModal()', function () {
      spyOn(modal, 'open').and.callFake(function () {
        return {
          result: ''
        }
      });
      loginFactory.openLoginModal();
      expect(modal.open).toHaveBeenCalled();
    });
  });
});