'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).config(['$routeProvider', function ($routeProvider) {
//  var routes = ['partial1','partial2'];
//  angular.forEach(routes, function(route) {
//    $routeProvider.when('/' + route, { templateUrl: 'partials/' + route + '.html', controller: route.charAt(0).toUpperCase() + route.substring(1) + 'Ctrl' });
//  });
  $routeProvider.when('/partial1', { templateUrl: 'partials/partial1.html', controller: 'Partial1Ctrl'});
  $routeProvider.when('/partial2', { templateUrl: 'partials/partial2.html', controller: 'Partial2Ctrl'});
  $routeProvider.otherwise({ redirectTo: '/partial1' });
}]);

//function getDevice() {
//  var myApp = angular.module('myApp');
//  myApp.device = getParameterByName('device') || WURFL.form_factor.toLowerCase();
//  return myApp.device.replace('/','');
//}

//function getPartialUrl(template) {
//  return 'partials/' + template + '.' + getDevice() + '.html';
//}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}