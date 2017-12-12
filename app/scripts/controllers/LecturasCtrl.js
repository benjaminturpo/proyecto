(function() {
  'use strict';


  angular
    .module('tsl.controllers')
    .controller('LecturasCtrl', LecturasCtrl);


  function LecturasCtrl($scope, $route, $rootScope, $window, toastr, DTOptionsBuilder, $interval, $timeout, Address, Arduino) {

    // device.digitalWrite(31, 0);
var device = new Device(Address);

    $scope.dtOptions = DTOptionsBuilder.newOptions()
      .withBootstrap();
    // .withOption('order', [1, 'desc']);
    $scope.selectedPin = {};
    $scope.loading = false;
    //TEMPERATURAS

    $rootScope.led = {};
    $rootScope.led.status = true;
    $rootScope.led.rojo = {
      text: 'Encender',
      pin: 31,
      status: false
    }
    $rootScope.led.ama = {
      text: 'Encender',
      pin: 30,
      status: false
    }
    $rootScope.led.verde = {
      text: 'Encender',
      pin: 32,
      status: false
    }
    $rootScope.led.azul = {
        text: 'Encender',
        pin: 36,
        status: false
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

    function getVal() {
      $scope.time = moment(new Date());
      device.getVariable('variables', function(res) {
        console.log(res.variables)
        $rootScope.temp.push({
          x: $scope.time,
          y: res.variables.temp22
        })
        $rootScope.hum.push({
          x: $scope.time,
          y: res.variables.hum22
        })
        $rootScope.gas.push({
          x: $scope.time,
          y: res.variables.mq135
        })


      })

    }


    $rootScope.encender = function(pin) {

        Object.keys($rootScope.led).map(function(objectKey, index) {

          var value = $rootScope.led[objectKey];
          if (value.pin === pin.pin) {
            console.log(value)
            $rootScope.led[objectKey].status = true;

          }
        });
        Arduino.leerPin(pin.pin).then(function(res) {
            var estado = res.return_value
            console.log('estado del puerto', estado)
            if (estado === 0) {
              Arduino.setPin(pin.pin, 1).then(function(res) {
                console.log(res)
                Object.keys($rootScope.led).map(function(objectKey, index) {

                  var value = $rootScope.led[objectKey];
                  if (value.pin === pin.pin) {
                    console.log(value)
                    $rootScope.led[objectKey].status = false;
                    $rootScope.led[objectKey].text = 'APAGAR';

                  }
                });
              })

            }

            if (estado === 1) {
              Arduino.setPin(pin.pin, 0).then(function(res) {
                console.log(res)
                Object.keys($rootScope.led).map(function(objectKey, index) {

                  var value = $rootScope.led[objectKey];
                  if (value.pin === pin.pin) {
                    console.log(value)
                    $rootScope.led[objectKey].status = false;
                    $rootScope.led[objectKey].text = 'ENCENDER';


                  }
                });
              })

            }

          })
        


      }
      $scope.time = moment(new Date());
        $interval( function(){ 
       $rootScope.inter = 100000;

      getVal()

    }, $rootScope.inter);

  }

})();