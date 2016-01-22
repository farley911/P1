(function () {
  'use strict';

  describe('Auth Factory Tests', function () {
    var $httpBackend, $scope, authFactory, checkAuthSpy, closeSpy, defer, dismissSpy, email, getObjSpy, homeReqHandler, forgotPasswordReqHandler, isLoggedInReqHandler, loginReqHandler, logOutReqHandler, removeSpy, closeModalSpy, openModalSpy, coreFactory, coreFactoryMock, sessionStorageFactory, sessionStorageFactoryMock, setObjSpy, user;

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
      checkAuthSpy = jasmine.createSpy('checkAuth');
      closeSpy = jasmine.createSpy('$close');
      dismissSpy = jasmine.createSpy('$dismiss');
      closeModalSpy = jasmine.createSpy('closeModal');
      openModalSpy = jasmine.createSpy('openModal');

      sessionStorageFactoryMock = {
        setObj: setObjSpy,
        getObj: getObjSpy,
        remove: removeSpy
      };
      sessionStorageFactory = sessionStorageFactoryMock;
      sessionStorageFactory.remove('user'); // Prevent this value from being stored between tests

      coreFactoryMock = {
        closeModal: closeModalSpy,
        openModal: openModalSpy
      };
      coreFactory = coreFactoryMock;

      module(function ($provide) {
        $provide.value('sessionStorageFactory', sessionStorageFactoryMock);
      });

      module(function ($provide) {
        $provide.value('coreFactory', coreFactoryMock);
      });
    });

    beforeEach(inject(function (_$httpBackend_, _$rootScope_, $injector, $q) {
      $httpBackend = _$httpBackend_; 
      defer = $q.defer();
      $scope = _$rootScope_;
      loginReqHandler = $httpBackend.when('POST', 'login').respond(defer.promise);
      logOutReqHandler = $httpBackend.when('GET', 'logout').respond(defer.promise);
      isLoggedInReqHandler = $httpBackend.when('GET', 'isLoggedIn').respond(defer.promise);
      homeReqHandler = $httpBackend.when('GET', 'modules/home/home.html').respond({
        body: '<html><body>Mock homepage</body></html>'
      });
      forgotPasswordReqHandler = $httpBackend.when('POST', 'forgotPassword').respond(defer.promise);
      authFactory = $injector.get('authFactory');
      authFactory.scope = $scope;
      authFactory.scope.$close = closeSpy;
      authFactory.$dismiss = dismissSpy;

      $httpBackend.flush(); // Flush the isLoggedIn request that is outstanding from auth control run block
    }));

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    describe('authFactory.login()', function () {
      beforeEach(function () {
        authFactory.user = {
          email: 'bwayne@wayneenterprise.com',
          password: 'password123'
        };
      });

      it('should POST user to login', function () {
        $httpBackend.expectPOST('login', user);
        authFactory.login();
        $httpBackend.flush();
      });

      it('should set authFactory.isLoggedIn to true on successful login', function () {
        $httpBackend.expectPOST('login').respond(200);
        authFactory.login();
        $httpBackend.flush();
        expect(authFactory.isLoggedIn).toEqual(true);
      });

      it('should call closeModal() on successful login', function () {
        $httpBackend.expectPOST('login').respond(200);
        authFactory.login();
        $httpBackend.flush();
        expect(coreFactory.closeModal).toHaveBeenCalled();
      });

      it('should set authFactory.hasErrMsg to true if login fails', function () {
        $httpBackend.expectPOST('login').respond(400);
        authFactory.login();
        $httpBackend.flush();
        expect(authFactory.hasErrMsg).toEqual(true);
      });

      it('should set authFactory.errMsg to "Incorrect Password" if login fails', function () {
        $httpBackend.expectPOST('login').respond(400);
        authFactory.login();
        $httpBackend.flush();
        expect(authFactory.errMsg).toEqual('Incorrect password.');
      });
    });

    describe('authFactory.logout()', function () {
      it('should GET logout', function () {
        $httpBackend.expectGET('logout');
        authFactory.logout();
        $httpBackend.flush();
      });

      it('should call sessionStorageFactory.remove("user")', function () {      
        $httpBackend.expectGET('logout');
        authFactory.logout();
        $httpBackend.flush();
        expect(sessionStorageFactory.remove).toHaveBeenCalledWith('user');
      });
    });

    describe('authFactory.checkAuth()', function () {
      it('should set authFactory.isLoggedIn to false if a user is not logged in', function () {
        authFactory.checkAuth();
        $httpBackend.expectGET('isLoggedIn').respond({
          isLoggedIn: false
        });
        $httpBackend.flush();
        expect(authFactory.isLoggedIn).toEqual(false);
      });

      it('should set authFactory.isLoggedIn to true if a user is logged in', function () {
        user = {
          username: 'bwayne',
          password: 'password123'
        };
        $httpBackend.expectPOST('login');
        authFactory.login();
        $httpBackend.flush();
        expect(authFactory.isLoggedIn).toEqual(true);
      });

      it('should remove sessionStorage["user"] if the user is not logged in', function () {
        user = {
          user: {
            first_name: 'Bruce',
            last_name: 'Wayne'
          }
        };
        sessionStorageFactory.setObj('user', user);
        $httpBackend.expectGET('isLoggedIn').respond({
          isLoggedIn: false
        });
        authFactory.checkAuth();
        $httpBackend.flush();
        expect(sessionStorageFactory.remove).toHaveBeenCalledWith('user');
      });
    });

    describe('authFactory.forgotPassword()', function () {
      beforeEach(function () {
        email = 'bwayne@wayneenterprise.com';
      });

      it('should set authFactory.forgotPasswordFeedback to the value of res.data.message', function () {
        $httpBackend.expectPOST('forgotPassword').respond({
          message: 'foo bar baz'
        });
        authFactory.forgotPassword(email);
        $httpBackend.flush();
        expect(authFactory.forgotPasswordFeedback).toEqual('foo bar baz');
      });

      it('should set authFactory.forgotPasswordError to the value of res.data.message when forgotPassword throws an error', function () {
        $httpBackend.expectPOST('forgotPassword').respond(400, {
          message: 'foo bar baz'
        });
        authFactory.forgotPassword(email);
        $httpBackend.flush();
        expect(authFactory.forgotPasswordError).toEqual('foo bar baz');
      });
    });

    describe('authFactory.updatePassword', function () {
      beforeEach(function () {
        authFactory.user = {
          email: 'bwayne@wayneenterprise.com',
          password: 'password'
        };
      });

      it('should authFactory.user to the value returned by /updatePassword', function () {
        user = {
          name: 'bruce wayne'
        };
        $httpBackend.expectPOST('updatePassword').respond(user);
        authFactory.updatePassword();
        $httpBackend.flush();
        expect(authFactory.user).toEqual(user);
      });

      it('should call authFactory.login when updatePassword resolves', function () {    
        authFactory.login = jasmine.createSpy('login').and.returnValue(defer.promise);
        user = {
          username: 'bwayne',
          password: 'password123'
        };
        $httpBackend.expectPOST('updatePassword').respond(user);
        authFactory.updatePassword();
        $httpBackend.flush();
        expect(authFactory.login).toHaveBeenCalled();
      });
    });
  });
})();