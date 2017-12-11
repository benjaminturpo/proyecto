(function () {
  'use strict';


  angular
    .module('tsl.controllers')
    .controller('LecturasCtrl', LecturasCtrl);


  function LecturasCtrl($scope, $route,$rootScope, $window, toastr, DTOptionsBuilder,$interval,Address,Arduino) {
   var device = new Device(Address);
          // device.digitalWrite(31, 0);
  
       
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
                    format: "HH:mm",
                    unit: 'minute',
                    unitStepSize: 2,
                    
                },
                distribution: 'linear'
            }]
        }
  };

   $rootScope.temp = [];
   $rootScope.hum = [];
   $rootScope.gas = [];
   $scope.labels = [];
   function getVal(){
    $scope.time = moment(new Date());
       device.getVariable('variables', function(res){
             console.log(res.variables)
    $rootScope.temp.push({x: $scope.time,y:res.variables.temp22})
    $rootScope.hum.push({x: $scope.time,y:res.variables.hum22})
    $rootScope.gas.push({x: $scope.time,y:res.variables.mq135})


        })
    // Arduino.getData().then(function(res){
    
    // console.log('nueva temo', $scope.temp)
    
   // }) 
   }
  

   $rootScope.encender = function(pin){
   // var device = new Device(Address);
  $interval.cancel()
   $rootScope.inter = 0;

     device.digitalRead(pin.pin, function(data) {
      var estado = data.return_value
        console.log('lectura del puerto',data)
        console.log('accion', pin)
    if(estado === 0){
          device.digitalWrite(pin.pin, 1);
          pin.text = 'APAGAR'
    }
    
   if(estado === 1){
          device.digitalWrite(pin.pin, 0);
          pin.text = 'ENCENDER'
    }
      });
    
   }
   // $scope.time = moment(new Date());
    $interval( function(){ 
   $rootScope.inter = 100000;
     
    getVal();
   // $scope.time.add($rootScope.inter)
    // $scope.labels.push($scope.time)
    // $scope.labels =  $scope.temp
    
  }, $rootScope.inter);

  }

})();
 