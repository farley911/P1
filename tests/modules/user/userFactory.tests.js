(function () {
  'use strict';

  describe('User Factory Tests', function () {
    var $httpBackend, defer, isLoggedInReqHandler, getUserReqHandler, userFactory, setObjSpy, getObjSpy, removeSpy, sessionStorageFactory, sessionStorageFactoryMock, user;

    beforeEach(module('P1'));

    beforeEach(function () { 
      // Create spies
      setObjSpy = jasmine.createSpy('setObj').and.callFake(function (key, value) {
        window.sessionStorage[key] = JSON.stringify(value);
      });
      getObjSpy = jasmine.createSpy('getObj').and.callFake(function (key) {
       return window.sessionStorage[key] ? JSON.parse(window.sessionStorage[key]) : null;
      });
      removeSpy = jasmine.createSpy('removeSpy').and.callFake(function (key) {
        window.sessionStorage.removeItem(key);
      });

      sessionStorageFactoryMock = {
        setObj: setObjSpy,
        getObj: getObjSpy,
        remove: removeSpy
      };

      sessionStorageFactory = sessionStorageFactoryMock;
      sessionStorageFactory.remove('user');

      module(function ($provide) {
        $provide.value('sessionStorageFactory', sessionStorageFactoryMock);
      });
    });

    beforeEach(inject(function (_$httpBackend_, _$rootScope_, $injector, $q) {
      $httpBackend = _$httpBackend_; 
      defer = $q.defer();
      getUserReqHandler = $httpBackend.when('GET', 'getUser').respond(defer.promise);
      isLoggedInReqHandler = $httpBackend.when('GET', 'isLoggedIn').respond(defer.promise);
      userFactory = $injector.get('userFactory');

      $httpBackend.flush(); // Flush the isLoggedIn request that is outstanding from auth control run block
    }));

    describe('userFactory.getUser()', function () {
      beforeEach(function () {
        user = {
          user: {
            first_name: 'Bruce',
            last_name: 'Wayne'
          }
        };
      });

      it('should set sessionStorageFactory["user"] the current user if one is set', function () {
        $httpBackend.expectGET('getUser').respond(user);
        userFactory.getUser();
        $httpBackend.flush();
        expect(sessionStorageFactory.getObj('user')).toEqual(user.user);
      });

      it('should not call GET getUser is the user is already stored in sessionStorage', function () {
        sessionStorageFactory.setObj('user', user);
        userFactory.getUser();
        expect($httpBackend.flush).toThrowError('No pending request to flush !');
      });

      it('should set userFactory.data.name when userFactory.activate() is called', function () {
        $httpBackend.expectGET('getUser').respond(user);
        userFactory.activate();
        $httpBackend.flush();
        expect(userFactory.data.name).toEqual('Bruce Wayne');
      });
    });
  });
})();