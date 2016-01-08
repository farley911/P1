'use strict'

describe('Registration Factory Tests', function() {
  var $httpBackend, defer, user, authFactory, doesUserExistReqHandler, registrationFactory, registerReqHandler, setValiditySpy;

  beforeEach(module('P1'));

  beforeEach(inject(function(_$httpBackend_, $injector, $q) {
    $httpBackend = _$httpBackend_; 
    defer = $q.defer();
    registerReqHandler = $httpBackend.when('POST', 'register').respond(defer.promise);
    doesUserExistReqHandler = $httpBackend.when('POST', 'doesUserExist').respond(defer.promise);
    setValiditySpy = jasmine.createSpy('$setValidity');
    registrationFactory = $injector.get('registrationFactory');
    authFactory = $injector.get('authFactory');

    registrationFactory.regForm = {
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

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('registrationFactory.register()', function() {
    beforeEach(function () {
      user = {
        username: 'bwayne',
        email: 'bwayne@wayneenterprise.com',
        first_name: 'Bruce',
        last_name: 'Wyane',
        password: 'password123'
      };
    });

    it('should POST user to register', function() {
      $httpBackend.expectPOST('register', user);
      registrationFactory.user = user;
      registrationFactory.register();
      $httpBackend.flush();
    });

    it('should set authFactory.isLoggedIn to true on a successful registration', function() {
      $httpBackend.expectPOST('register').respond({ status: 200 });
      registrationFactory.register(user);
      $httpBackend.flush();
      expect(authFactory.isLoggedIn).toEqual(true);
    });

    it('should set registration.error if registrationFactory.register() returns an error', function () {
      $httpBackend.expectPOST('register').respond(400, 'this is the error');
      registrationFactory.register();
      $httpBackend.flush();
      expect(registrationFactory.error).toEqual('this is the error');
    });
  });

  describe('registrationFactory.doesUserExist()', function() {
    it('should not POST /doesUserExist if registrationFactory.regForm.email.$valid is false', function() {
      registrationFactory.regForm.email.$valid = false;
      registrationFactory.doesUserExist();
      expect($httpBackend.flush).toThrowError('No pending request to flush !');
    });

    describe('check email field validity', function () {
      it('should call registrationFactory.regForm.email.$setValidity with userExists set to false if /doesUserExist responds with "user exists"', function () {
        $httpBackend.expectPOST('doesUserExist').respond({ message: 'user exists' });
        registrationFactory.doesUserExist();
        $httpBackend.flush();
        expect(registrationFactory.regForm.email.$setValidity).toHaveBeenCalledWith('userExists', false);
      });

      it('should call registrationFactory.regForm.email.$setValidity with userExists set to true if /doesUserExist responds with anything besides "user exists"', function () {
        $httpBackend.expectPOST('doesUserExist').respond({ message: 'okay' });
        registrationFactory.doesUserExist();
        $httpBackend.flush();
        expect(registrationFactory.regForm.email.$setValidity).toHaveBeenCalledWith('userExists', true);
      });
    });
  });

  describe('registrationFactory.checkUsername()', function() {
    it('should not POST /checkUsername if registrationFactory.regForm.username.$valid is false', function() {
      registrationFactory.regForm.username.$valid = false;
      registrationFactory.checkUsername();
      expect($httpBackend.flush).toThrowError('No pending request to flush !');
    });

    describe('check username field validity', function () {
      it('should call registrationFactory.regForm.username.$setValidity with usernameTaken set to true if /checkUsername responds with "username available"', function () {
        $httpBackend.expectPOST('checkUsername').respond({ message: 'username available' });
        registrationFactory.checkUsername();
        $httpBackend.flush();
        expect(registrationFactory.regForm.username.$setValidity).toHaveBeenCalledWith('usernameTaken', true);
      });

      it('should call registrationFactory.regFactory.username.$setValidity with usernameTaken set to false if /checkUsername responds with anything besides "username available"', function () {
        $httpBackend.expectPOST('checkUsername').respond({ message: 'username taken' });
        registrationFactory.checkUsername();
        $httpBackend.flush();
        expect(registrationFactory.regForm.username.$setValidity).toHaveBeenCalledWith('usernameTaken', false);
      });
    });
  });
});