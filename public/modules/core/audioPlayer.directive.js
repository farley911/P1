(function() {
  'use strict'

  angular
    .module('P1.audioPlayerDirective', [])
    .directive('audioPlayerDirective', audioPlayerDirective);

  function audioPlayerDirective() {
    return {
      link: function(scope, element, attr) {
        scope.src = attr.src;
      },
      templateUrl: 'modules/core/audioPlayer.html'
    }
  }
})();