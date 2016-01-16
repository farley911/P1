'use strict'

describe('Auth Controller Tests', function () {
  var $controller, $httpBackend, $scope, $state, $window, activateSpy, Auth, authFactory, checkAuthSpy, closeSpy, defer, initializeSpy, coreFactory, goSpy, loginSpy, logoutSpy, openModalSpy, sessionStorageFactory, isLoggedInReqHandler;

  beforeEach(module('P1'));
  
  beforeEach(inject(function (_$controller_, _$httpBackend_, _$rootScope_, _$window_, $q, $injector) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    $scope = _$rootScope_;
    $window = _$window_;
    defer = $q.defer();

    // Create spies
    activateSpy = jasmine.createSpy('activate');
    checkAuthSpy = jasmine.createSpy('checkAuth');
    closeSpy = jasmine.createSpy('$close');
    loginSpy = jasmine.createSpy('login').and.returnValue(defer.promise);
    goSpy = jasmine.createSpy('go');
    logoutSpy = jasmine.createSpy('logout');
    openModalSpy = jasmine.createSpy('openModal');
    initializeSpy = jasmine.createSpy('initialize');

    sessionStorageFactory = $injector.get('sessionStorageFactory');

    isLoggedInReqHandler = $httpBackend.when('GET', 'isLoggedIn').respond(defer.promise);

    // Create mock services
    $scope.$close = closeSpy;

    authFactory = {
      activate: activateSpy,
      checkAuth: checkAuthSpy,
      initialize: initializeSpy,
      login: loginSpy,
      isLoggedIn: false,
      logout: logoutSpy,
    };

    $state = {
      go : goSpy
    };

    // Define coreFactory
    coreFactory = {
      openModal: openModalSpy
    };

    // Init authFactory controller with mocked services
    Auth = $controller('Auth', {
      $scope: $scope,
      authFactory: authFactory,
      coreFactory: coreFactory,
      $state: $state
    });

    // digest to update controller with services and scope
    $scope.$digest();
  }));

  describe('Auth.login()', function () {
    beforeEach(function () {      
      Auth.user = {
        email: 'bwayne@wayneenterprise.com',
        password: 'password123'
      };
    });

    it('should call authFactory.login()', function () {
      Auth.login();
      expect(authFactory.login).toHaveBeenCalledWith();
    });

    it('should call $state.go("secure.user") on successful login', function () {
      Auth.login();
      defer.resolve({});
      $scope.$digest();
      expect($state.go).toHaveBeenCalledWith('secure.user');
    });
  });

  describe('AuthCtrl.openLoginModal()', function () {
    it('should call openLoginModal()', function () {
      Auth.openLoginModal();
      expect(coreFactory.openModal).toHaveBeenCalled();
    });
  });

  describe('AuthCtrl.logout', function () {
    it('should call authFactory.logout()', function () {
      Auth.logout();
      expect(authFactory.logout).toHaveBeenCalled();
    });

    it('should call $state.go("home")', function () {
      Auth.logout();
      expect($state.go).toHaveBeenCalledWith('home');
    });
  });
});