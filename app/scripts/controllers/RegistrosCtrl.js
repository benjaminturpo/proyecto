(function () {
  'use strict';


  angular
    .module('tsl.controllers')
    .controller('RegistrosCtrl', RegistrosCtrl);


  function RegistrosCtrl($scope, $route,$rootScope, $window, toastr, DTOptionsBuilder,$interval) {
   
       $scope.dtOptions = DTOptionsBuilder.newOptions()
                      .withBootstrap();
                      // .withOption('order', [1, 'desc']);
 

  }

})();
 