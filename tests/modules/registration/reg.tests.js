'use strict'

describe('Registration Controller Tests', function() {
  var $controller, $scope, defer, registerSpy, doesUserExistSpy, checkUsernameSpy, registrationFactory, Registration, $httpBackend, authReqHandler, checkUsernameReqHandler, loginReqHandler, userReqHandler, $state, goSpy, setValiditySpy;

  beforeEach(module('P1'));

  beforeEach(inject(function (_$controller_, _$rootScope_, $q, $injector) {
    $controller = _$controller_;
    $scope = _$rootScope_;
    defer = $q.defer();

    // Create spies
    registerSpy = jasmine.createSpy('register').and.returnValue(defer.promise);
    doesUserExistSpy = jasmine.createSpy('doesUserExist').and.returnValue(defer.promise);
    checkUsernameSpy = jasmine.createSpy('checkUsername').and.returnValue(defer.promise);
    goSpy = jasmine.createSpy('go');
    setValiditySpy = jasmine.createSpy('$setValidity');

    $state = {
      go: goSpy
    };

    registrationFactory = {
      register: registerSpy,
      doesUserExist: doesUserExistSpy,
      checkUsername: checkUsernameSpy
    };    

    // Init register controller with mocked services
    Registration = $controller('Registration', {
      $scope: $scope,
      registrationFactory: registrationFactory,
      $state: $state
    });

    // Mock $httpBackend
    $httpBackend = $injector.get('$httpBackend');
    authReqHandler = $httpBackend.when('GET', 'modules/home/home.html').respond({ body: '<html><body>Mock homepage</body></html>'});
    checkUsernameReqHandler = $httpBackend.when('POST', 'checkUsername').respond(defer.promise);
    loginReqHandler = $httpBackend.when('GET', 'modules/user/login.html').respond({ body: '<html><body>Mock login</body></html>'});
    userReqHandler = $httpBackend.when('GET', 'modules/user/user.html').respond({ body: '<html><body>Mock user profile</body></html>'});

    // digest to update controller with services and scope
    $scope.$digest();

    Registration.user = {
      username: 'bwyane',
      email: 'bwayne@wayneenterprise.com',
      first_name: 'Bruce',
      last_name: 'Wyane',
      password: 'password123'
    };
    Registration.regForm = {
      username: {
        $valid: true,
        $setValidity: setValiditySpy
      },
      email: {
        $valid: true,
        $setValidity: setValiditySpy
      }
    }
  }));

  describe('RegistrationCtrl.register()', function () {
    it('should call registrationFactory.register() with $scope.user', function () {
      Registration.register();
      expect(registrationFactory.register).toHaveBeenCalledWith(Registration.user);
    });

    it('should call $state.go("secure.user") when registration is successful', function () {
      Registration.register();
      defer.resolve({});
      $scope.$digest();
      expect($state.go).toHaveBeenCalledWith('secure.user');
    });

    it('should set Registration.error if Registration.register() returns an error', function () {
      Registration.register();
      defer.reject({ error: 'this is the error' });
      $scope.$digest();
      expect(Registration.error).toEqual({ error: 'this is the error' });
    });
  });

  describe('Registration.alreadyRegistered()', function () {
    it('should call registrationFactory.doesUserExist with $scope.user', function () {
      Registration.alreadyRegistered();
      expect(registrationFactory.doesUserExist).toHaveBeenCalledWith({ email: Registration.user.email });
    });

    it('should not call registrationFactory.doesUserExist if regForm.email.$valid is false', function() {
      Registration.regForm.email.$valid = false;
      Registration.alreadyRegistered();
      expect(registrationFactory.doesUserExist).not.toHaveBeenCalled();
    });

    it('should return the error if registrationFactory.doesUserExist resolves an error', function () {
      Registration.alreadyRegistered();
      defer.reject({ message: 'successful failure'});
      $scope.$apply();
      expect(Registration.error).toEqual({ message: 'successful failure' });
    });

    describe('check email field validity', function () {
      it('should call Registration.email.$setValidity with userExists set to false', function () {
        Registration.alreadyRegistered();
        defer.resolve(true);
        $scope.$apply();
        expect(Registration.regForm.email.$setValidity).toHaveBeenCalledWith('userExists', false);
      });

      it('should call Registration.email.$setValidity with userExists set to true', function () {
        Registration.alreadyRegistered();
        defer.resolve(false);
        $scope.$apply();
        expect(Registration.regForm.email.$setValidity).toHaveBeenCalledWith('userExists', true);
      });
    });
  });
    
  describe('Registration.checkUsername', function () {
    it('should call registrationFactory.checkUsername with reg.user.username', function () {
      Registration.checkUsername();
      expect(registrationFactory.checkUsername).toHaveBeenCalledWith({ username: Registration.user.username });
    });

    describe('check username field validity', function () {
      it('should call Registration.username.$setValidity with usernameTaken set to true', function () {
        Registration.checkUsername();
        defer.resolve(true);
        $scope.$apply();
        expect(Registration.regForm.username.$setValidity).toHaveBeenCalledWith('usernameTaken', true);
      });

      it('should call Registration.username.$setValidity with usernameTaken set to false', function () {
        Registration.checkUsername();
        defer.resolve(false);
        $scope.$apply();
        expect(Registration.regForm.username.$setValidity).toHaveBeenCalledWith('usernameTaken', false);
      });
    });
  });
});