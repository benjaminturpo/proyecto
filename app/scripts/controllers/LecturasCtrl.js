(function () {
  'use strict';


  angular
    .module('tsl.controllers')
    .controller('LecturasCtrl', LecturasCtrl);


  function LecturasCtrl($scope, $route,$rootScope, $window, toastr, DTOptionsBuilder,$interval,Address,Arduino) {
   var device = new Device(Address);
  
       
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
   //  $scope.getNewData = function(){
   //       Arduino.getData().then(function(res){
    
   //  $scope.datos = res.data.variables
   //  console.log('arduino', $scope.datos)
   // })    
   //  }
  
 $scope.options = {
      scales: {
            xAxes: [{
                type: 'time',
                time: {
                    displayFormats: {
                        quarter: 'MMM YYYY'
                    },
                    unit: 'second',
                    unitStepSize: 5
                },
                distribution: 'linear'
            }]
        }
  };
   $scope.temp = [];
   $scope.hum = [];
   $scope.gas = [];
   $scope.labels = [];
   function getVal(){
       device.getVariable('variables', function(res){
             console.log(res.variables)
    $scope.temp.push(res.variables.temp22)
    $scope.hum.push(res.variables.hum22)
    $scope.gas.push(res.variables.mq135)


        })
    // Arduino.getData().then(function(res){
    
    // console.log('nueva temo', $scope.temp)
    
   // }) 
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
   $scope.time = moment(new Date());
    $interval( function(){ 
     $scope.inter = 5000;
    getVal();
    
   $scope.time.add($scope.inter)
    $scope.labels.push($scope.time)
    
  }, $scope.inter);

  }

})();
 