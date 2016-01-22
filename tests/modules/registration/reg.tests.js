(function () {
  'use strict';

  describe('Registration Controller Tests', function () {
    var $controller, $scope, defer, registerSpy, doesUserExistSpy, checkUsernameSpy, registrationFactory, Registration, $httpBackend, authReqHandler, checkUsernameReqHandler, isLoggedInReqHandler, loginReqHandler, userReqHandler, $state, goSpy;

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
      authReqHandler = $httpBackend.when('GET', 'modules/home/home.html').respond({
        body: '<html><body>Mock homepage</body></html>'
      });
      checkUsernameReqHandler = $httpBackend.when('POST', 'checkUsername').respond(defer.promise);
      loginReqHandler = $httpBackend.when('GET', 'modules/user/login.html').respond({
        body: '<html><body>Mock login</body></html>'
      });
      userReqHandler = $httpBackend.when('GET', 'modules/user/user.html').respond({
        body: '<html><body>Mock user profile</body></html>'
      });
      isLoggedInReqHandler = $httpBackend.when('GET', 'isLoggedIn').respond(defer.promise);

      // digest to update controller with services and scope
      $scope.$digest();

      Registration.user = {
        username: 'bwyane',
        email: 'bwayne@wayneenterprise.com',
        first_name: 'Bruce',
        last_name: 'Wyane',
        password: 'password123'
      };
    }));

    describe('RegistrationCtrl.register()', function () {
      it('should call registrationFactory.register()', function () {
        Registration.register();
        expect(registrationFactory.register).toHaveBeenCalledWith();
      });

      it('should call $state.go("secure.user") when registration is successful', function () {
        Registration.register();
        defer.resolve({});
        $scope.$digest();
        expect($state.go).toHaveBeenCalledWith('secure.user');
      });
    });

    describe('Registration.alreadyRegistered()', function () {
      it('should call registrationFactory.doesUserExist', function () {
        Registration.alreadyRegistered();
        expect(registrationFactory.doesUserExist).toHaveBeenCalled();
      });
    });
      
    describe('Registration.checkUsername', function () {
      it('should call registrationFactory.checkUsername', function () {
        Registration.checkUsername();
        expect(registrationFactory.checkUsername).toHaveBeenCalled();
      });
    });
  });
})();