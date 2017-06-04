(function () {
  'use strict';


  angular
    .module('tsl.controllers')
    .controller('SensoresCtrl', SensoresCtrl);


  function SensoresCtrl($scope, $route,$rootScope, $window, toastr, DTOptionsBuilder,$interval) {
   
       $scope.dtOptions = DTOptionsBuilder.newOptions()
                      .withBootstrap();
                      // .withOption('order', [1, 'desc']);
 		
$scope.temp = {
    minValue: 0,
    maxValue: 100,
    options: {
   showSelectionBar: true,
        getSelectionBarColor: function(value) {
       
          return '#2196f3';
        },
             getPointerColor: function(value) {
          
            return '#2196f3';
        },
       floor: 0,
    ceil: 100,
    showTicks: 10
    }
};

$scope.humedad = {
    minValue: 0,
    maxValue: 100,
    options: {
   showSelectionBar: true,
        getSelectionBarColor: function(value) {
       
          return '#e91e63';
        },
             getPointerColor: function(value) {
          
            return '#e91e63';
        },
       floor: 0,
    ceil: 100,
    showTicks: 10
    }
};
$scope.co2 = {
    minValue: 0,
    maxValue: 100,
    options: {
   showSelectionBar: true,
        getSelectionBarColor: function(value) {
       
          return '#cddc39';
        },
             getPointerColor: function(value) {
          
            return '#cddc39';
        },
       floor: 0,
    ceil: 100,
    showTicks: 10
    }
};
  }

})();
 