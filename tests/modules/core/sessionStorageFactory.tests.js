(function () {
  'use strict';

  describe('sessionStorageFactory tests', function () {
    var $window, sessionStorageFactory;

    beforeEach(module('P1'));

    beforeEach(inject(function ($injector, _$window_) {
      $window = _$window_;
      sessionStorageFactory = $injector.get('sessionStorageFactory');
    }));

    afterEach(function () {
      sessionStorageFactory.remove('foo');
    });

    describe('sessionStorageFactory.set()', function () {
      it('should set $window.sessionStorage[key] to the provided value', function () {
        sessionStorageFactory.set('foo', 'bar');
        expect($window.sessionStorage.foo).toEqual('bar');
      });
    });

    describe('sessionStorageFactory.get()', function () {
      it('should get $window.sessionStorage["key"]', function () {
        $window.sessionStorage.foo = 'bar';
        expect(sessionStorageFactory.get('foo')).toEqual('bar');
      });

      it('should return the default value if one is provided', function () {
        expect(sessionStorageFactory.get('foo','default')).toEqual('default');
      });
    });

    describe('sessionStorageFactory objects', function () {
      var obj;

      beforeEach(function () {
        obj = [{
          foo: 'bar'
        }];
      });

      describe('sessionStorageFactory.setObj()', function () {
        it('should set $window.sessionStorage["key"] to an object', function () {
          sessionStorageFactory.setObj('foo', obj);
          expect($window.sessionStorage.foo).toEqual(JSON.stringify(obj));
        });
      });

      describe('sessionStorageFactory.getObj()', function () {
        it('should get an object from $window.sessionStorage["key"]', function () {
          $window.sessionStorage.foo = JSON.stringify(obj);
          expect(sessionStorageFactory.getObj('foo')).toEqual(obj);
        });

        it('should return null if no object is found', function () {
          expect(sessionStorageFactory.getObj('foo')).toEqual(null);
        });
      });

      describe('sessionStorageFactory.remove()', function () {
        it('should remove the desired session from $window.sessionStorage', function () {
          sessionStorageFactory.set('foo', 'bar');
          expect($window.sessionStorage.foo).toEqual('bar');

          sessionStorageFactory.remove('foo');
          expect($window.sessionStorage.foo).toEqual(undefined);

          sessionStorageFactory.setObj('foo', obj);
          expect($window.sessionStorage.foo).toEqual(JSON.stringify(obj));

          sessionStorageFactory.remove('foo');
          expect($window.sessionStorage.foo).toEqual(undefined);
        });
      });
    });
  });
})();