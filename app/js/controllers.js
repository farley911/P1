'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
	.controller('App', ['$scope', function($scope) {
		var device = getParameterByName('device') || WURFL.form_factor.toLowerCase();
		$scope.device = device.replace('/','');
	}])
  .controller('Partial1Ctrl', ['$scope', '$http', function($scope, $http) {
  	$scope.test = "hello world";

//  	var pathName = window.location.pathname.split('.')[0],
//		    deviceUrl = 'partials/' + pathName + '.' + getDevice() + '.html';
//		alert(window.location);
//		$http.get(deviceUrl).
//		  success(function() {
//		    $route.current.templateUrl = deviceUrl;
//		  });
  }])
  .controller('Partial2Ctrl', ['$scope', function($scope) {

  }]);
