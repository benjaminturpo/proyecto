(function () {
  'use strict';


  angular
    .module('tsl.controllers')
    .controller('SensoresCtrl', SensoresCtrl);


  function SensoresCtrl($scope, $route,$rootScope, $window, toastr, DTOptionsBuilder,$interval) {
   
       $scope.dtOptions = DTOptionsBuilder.newOptions()
                      .withBootstrap();
                      // .withOption('order', [1, 'desc']);
 		

 		

  }

})();
 