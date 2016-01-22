(function () {
  'use strict';

  describe('Auth Controller Tests', function () {
    var $controller, $httpBackend, $scope, $state, $window, activateSpy, Auth, authFactory, checkAuthSpy, closeSpy, defer, initializeSpy, coreFactory, goSpy, forgotPasswordSpy, loginSpy, logoutSpy, openModalSpy, updatePasswordSpy, stateParamsMock, sessionStorageFactory, isLoggedInReqHandler;

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
      forgotPasswordSpy = jasmine.createSpy('forgotPassword');
      loginSpy = jasmine.createSpy('login').and.returnValue(defer.promise);
      goSpy = jasmine.createSpy('go');
      logoutSpy = jasmine.createSpy('logout');
      openModalSpy = jasmine.createSpy('openModal');
      updatePasswordSpy = jasmine.createSpy('updatePassword').and.returnValue(defer.promise);
      initializeSpy = jasmine.createSpy('initialize');

      sessionStorageFactory = $injector.get('sessionStorageFactory');

      isLoggedInReqHandler = $httpBackend.when('GET', 'isLoggedIn').respond(defer.promise);

      // Create mock services
      $scope.$close = closeSpy;

      authFactory = {
        activate: activateSpy,
        checkAuth: checkAuthSpy,
        forgotPassword: forgotPasswordSpy,
        initialize: initializeSpy,
        login: loginSpy,
        isLoggedIn: false,
        logout: logoutSpy,
        updatePassword: updatePasswordSpy,
        user: {
          email: null,
          username: null,
          password: null,
          c_password: null
        }
      };

      $state = {
        go : goSpy
      };

      stateParamsMock = {
        email: 'bwayne@wayneenterprise.com'
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
        $state: $state,
        $stateParams: stateParamsMock
      });

      // digest to update controller with services and scope
      $scope.$digest();
    }));

    describe('Auth.login()', function () {
      beforeEach (function () {      
        Auth.user = {
          email: 'bwayne@wayneenterprise.com',
          password: 'password123'
        };
      });

      it('should call authFactory.login()', function () {
        Auth.login();
        expect (authFactory.login).toHaveBeenCalledWith();
      });

      it('should call $state.go("secure.user") on successful login', function () {
        Auth.login();
        defer.resolve({});
        $scope.$digest();
        expect ($state.go).toHaveBeenCalledWith('secure.user');
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

    describe('AuthCtrl.forgotPassword()', function () {
      it('should call authFactory.forgotPassword with email', function () {
        var email = 'bwayne@wayneenterprise.com';
        Auth.forgotPassword(email);
        expect(authFactory.forgotPassword).toHaveBeenCalledWith(email);
      });
    });

    describe('AuthCtrl.updatePassword()', function () {
      it('should call authFactory.updatePassword', function () {
        Auth.updatePassword();
        expect(authFactory.updatePassword).toHaveBeenCalled();
      });

      it('should call $state.go with secure.user when updatePassword resolves', function () {
        Auth.updatePassword();
        defer.resolve({});
        $scope.$digest();
        expect($state.go).toHaveBeenCalledWith('secure.user');
      });
    });
  });
})();