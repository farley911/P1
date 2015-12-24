'use strict'

describe('Registration Factory Tests', function() {
  var $httpBackend, defer, user, authFactory, registrationFactory, registerReqHandler;

  beforeEach(module('P1'));

  beforeEach(inject(function(_$httpBackend_, $injector, $q) {
    $httpBackend = _$httpBackend_; 
    defer = $q.defer();
    registerReqHandler = $httpBackend.when('POST', 'register').respond(defer.promise);
    registrationFactory = $injector.get('registrationFactory');
    authFactory = $injector.get('authFactory');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('authFactory.register(user)', function() {
    beforeEach(function () {
      user = {
        email: 'bwayne@wayneenterprise.com',
        first_name: 'Bruce',
        last_name: 'Wyane',
        password: 'password123'
      };
    });

    it('should POST user to register', function() {
      $httpBackend.expectPOST('register', user);
      registrationFactory.register(user);
      $httpBackend.flush();
    });

    it('should set authFactory.isLoggedIn to true on a successful registration', function() {
      $httpBackend.expectPOST('register').respond({ status: 200 });
      registrationFactory.register(user);
      $httpBackend.flush();
      expect(authFactory.isLoggedIn).toEqual(true);
    });
  });

  describe('registrationFactory.doesUserExist()', function() {
    it('should return true is a user exists', function() {
      user = {
        email: 'bwayne@wayneenterprise.com'
      };
      $httpBackend.whenPOST('doesUserExist').respond({ message: 'user exists' });
      var res;
      var doesUserExist = registrationFactory.doesUserExist(user)
        .then(function (data) {
          res = data;
        });
      $httpBackend.flush();
      expect(res).toEqual(true);
    });

    it('should return false if no user exists', function () {
      user = {
        email: 'bwayne@wayneenterprise.com'
      };
      $httpBackend.whenPOST('doesUserExist').respond('');
      var res;
      var doesUserExist = registrationFactory.doesUserExist(user)
        .then(function (data) {
          res = data;
        });
      $httpBackend.flush();
      expect(res).toEqual(false);
    });
  });

  describe('registrationFactory.checkUsername()', function() {
    it('should return true is a username is taken', function() {
      user = {
        username: 'bwayne'
      };
      $httpBackend.whenPOST('checkUsername').respond({ message: 'username available' });
      var res;
      var checkUsername = registrationFactory.checkUsername(user)
        .then(function (data) {
          res = data;
        });
      $httpBackend.flush();
      expect(res).toEqual(true);
    });

    it('should return false if no matching user is found', function () {
      user = {
        username: 'bwayne'
      };
      $httpBackend.whenPOST('checkUsername').respond('');
      var res;
      var checkUsername = registrationFactory.checkUsername(user)
        .then(function (data) {
          res = data;
        });
      $httpBackend.flush();
      expect(res).toEqual(false);
    });
  });
});