(function () {
  'use strict';


  angular
    .module('tsl.controllers')
    .controller('LecturasCtrl', LecturasCtrl);


  function LecturasCtrl($scope, $route,$rootScope, $window, toastr, DTOptionsBuilder,$interval,Address,Arduino) {
   var device = new Device(Address);
    device.digitalWrite(31, 1);


    $scope.dtOptions = DTOptionsBuilder.newOptions()
                      .withBootstrap();
                      // .withOption('order', [1, 'desc']);
$scope.series = ['Series A'];
    //TEMPERATURAS

    $scope.led ={};
    $scope.led.rojo= {
       text: 'Encender',
       pin: 31,
       status: 0
    }
      $scope.led.ama= {
       text: 'Encender',
       pin: 30,
       status: 0
    }
          $scope.led.verde= {
       text: 'Encender',
       pin: 32,
       status: 0
    }
             $scope.led.azul= {
       text: 'Encender',
       pin: 36,
       status: 0
    }
    $scope.getNewData = function(){
         Arduino.getData().then(function(res){
    
    $scope.datos = res.data.variables
    console.log('arduino', $scope.datos)
   })    
    }
  
 
   $scope.temp = [];
   
   function addTemp(){
    Arduino.getData().then(function(res){
    
    $scope.temp.push(res.data.variables.temp22)
    console.log('nueva temo', $scope.temp)
    $scope.labels = $scope.temp
   }) 
   }
  

   $scope.encender = function(pin){
    if(pin.status === 0){
          device.digitalWrite(pin.pin, 1);
          pin.text = 'APAGAR'
    }
    
   if(pin.status === 1){
          device.digitalWrite(pin.pin, 0);
          pin.text = 'ENCENDER'
    }
   }
  //   $interval( function(){ 

  //   addTemp();
    
  // }, 5000);

  }

})();
 