'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('myApp.controllers'));


  it('should ....', inject(function($controller) {
    //spec body
    var partial1Ctrl = $controller('Partial1Ctrl', { $scope: {} });
    expect(partial1Ctrl).toBeDefined();
  }));

  it('should ....', inject(function($controller) {
    //spec body
    var partial2Ctrl = $controller('Partial2Ctrl', { $scope: {} });
    expect(partial2Ctrl).toBeDefined();
  }));
});
