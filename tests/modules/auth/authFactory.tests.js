'use strict'

describe('Auth Factory Tests', function() {
  var $httpBackend, $scope, authFactory, checkAuthSpy, closeSpy, defer, dismissSpy, getObjSpy, homeReqHandler, isLoggedInReqHandler, loginReqHandler, logOutReqHandler, removeSpy, sessionStorageFactory, sessionStorageFactoryMock, setObjSpy, user;

  beforeEach(module('P1'));

  beforeEach(function() { 
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

    sessionStorageFactoryMock = {
      setObj: setObjSpy,
      getObj: getObjSpy,
      remove: removeSpy
    }

    sessionStorageFactory = sessionStorageFactoryMock;
    sessionStorageFactory.remove('user'); // Prevent this value from being stored between tests

    module(function($provide) {
      $provide.value('sessionStorageFactory', sessionStorageFactoryMock);
    });
  });

  beforeEach(inject(function(_$httpBackend_, _$rootScope_, $injector, $q) {
    $httpBackend = _$httpBackend_; 
    defer = $q.defer();
    $scope = _$rootScope_;
    loginReqHandler = $httpBackend.when('POST', 'login').respond(defer.promise);
    logOutReqHandler = $httpBackend.when('GET', 'logout').respond(defer.promise);
    isLoggedInReqHandler = $httpBackend.when('GET', 'isLoggedIn').respond(defer.promise);
    homeReqHandler = $httpBackend.when('GET', 'modules/home/home.html').respond({ body: '<html><body>Mock homepage</body></html>'});
    authFactory = $injector.get('authFactory');
    authFactory.scope = $scope;
    authFactory.scope.$close = closeSpy;
    authFactory.$dismiss = dismissSpy;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('authFactory.activate()', function () {
    it('should call authFactory.checkAuth()', function () {
      authFactory.activate();
      $httpBackend.flush();
      expect(checkAuthSpy).toHaveBeenCalled;
    });
  });

  describe('authFactory.login()', function() {
    beforeEach(function() {
      user = {
        email: 'bwayne@wayneenterprise.com',
        password: 'password123'
      };
    });

    it('should POST user to login', function() {
      $httpBackend.expectPOST('login', user);
      authFactory.login(user);
      $httpBackend.flush();
    });

    it('should set authFactory.isLoggedIn to true on successful login', function() {
      $httpBackend.expectPOST('login').respond(200);
      authFactory.login(user);
      $httpBackend.flush();
      expect(authFactory.isLoggedIn).toEqual(true);
    });

    it('should call $close() on successful login', function() {
      $httpBackend.expectPOST('login').respond(200);
      authFactory.login(user);
      $httpBackend.flush();
      expect(closeSpy).toHaveBeenCalled();
    });

    it('should set authFactory.hasErrMsg to true if login fails', function() {
      $httpBackend.expectPOST('login').respond(400);
      authFactory.login(user);
      $httpBackend.flush();
      expect(authFactory.hasErrMsg).toEqual(true);
    });

    it('should set authFactory.errMsg to "Incorrect Password" if login fails', function() {
      $httpBackend.expectPOST('login').respond(400);
      authFactory.login(user);
      $httpBackend.flush();
      expect(authFactory.errMsg).toEqual('Incorrect password.');
    });

    it('should call authFactory.$dismiss() if login fails', function() {
      $httpBackend.expectPOST('login').respond(400);
      authFactory.login(user);
      $httpBackend.flush();
      expect(dismissSpy).toHaveBeenCalled;
    });
  });

  describe('authFactory.logout()', function() {
    it('should GET logout', function() {
      $httpBackend.expectGET('logout');
      authFactory.logout();
      $httpBackend.flush();
    });

    it('should call sessionStorageFactory.remove("user")', function() {      
      $httpBackend.expectGET('logout');
      authFactory.logout();
      $httpBackend.flush();
      expect(sessionStorageFactory.remove).toHaveBeenCalledWith('user');
    });
  });

  describe('authFactory.checkAuth()', function() {
    it('should set authFactory.isLoggedIn to false if a user is not logged in', function() {
      authFactory.checkAuth();
      $httpBackend.expectGET('isLoggedIn').respond({ isLoggedIn: false });
      $httpBackend.flush();
      expect(authFactory.isLoggedIn).toEqual(false);
    });

    it('should set authFactory.isLoggedIn to true if a user is logged in', function() {
      user = {
        username: 'bwayne',
        password: 'password123'
      };
      $httpBackend.expectPOST('login');
      authFactory.login(user);
      $httpBackend.flush();
      expect(authFactory.isLoggedIn).toEqual(true);
    });

    it('should remove sessionStorage["user"] if the user is not logged in', function() {
      user = {
        user: {
          first_name: 'Bruce',
          last_name: 'Wayne'
        }
      };
      sessionStorageFactory.setObj('user', user);
      $httpBackend.expectGET('isLoggedIn').respond({ isLoggedIn: false });
      authFactory.checkAuth();
      $httpBackend.flush();
      expect(sessionStorageFactory.remove).toHaveBeenCalledWith('user');
    });
  });
});