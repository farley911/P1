'use strict'

describe('Login Factory Tests', function() {
  var modal, loginFactory;

  beforeEach(module('P1'));

  beforeEach(inject(function($injector, _$modal_) {
    modal = _$modal_;
    loginFactory = $injector.get('loginFactory');
  }));

  describe('loginFactory.openLoginModal($modal)', function () {
    it('should call modal.open when loginFactory.openLoginModal is called', function () {
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