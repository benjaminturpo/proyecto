(function () {
  'use strict';


  angular
    .module('tsl.controllers')
    .controller('LecturasCtrl', LecturasCtrl);


  function LecturasCtrl($scope, $route,$rootScope, $window, toastr, DTOptionsBuilder,$interval) {
   
       $scope.dtOptions = DTOptionsBuilder.newOptions()
                      .withBootstrap();
                      // .withOption('order', [1, 'desc']);
 $scope.colors = ['#2196f3', '#e91e63', '#cddc39'];
  $scope.labels = ["0", "1", "2", "3", "4", "5", "6",'7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','0'];
  $scope.series = ['Temperatura', 'Humedad', 'CO2'];
  $scope.data = [];
  $scope.data[0] = [25];
  $scope.data[1] = [80];

  $scope.data[2] = [50];
        
 $scope.date = new Date();
  $scope.intervalo = 5000;
  $scope.tiempo = (24 * 60);
  $scope.rango =  $scope.tiempo *  $scope.intervalo;

  $scope.callAtInterval = function() {
 if($scope.data[2].length < 24){
    var temp =   Math.floor(Math.random() * 3) + 25  ;
    var hum =    Math.floor(Math.random() * 10) +85  ;
    var co2 =   Math.floor(Math.random() * 6) + 55  ;
        $scope.data[0].push(temp);
        $scope.data[1].push(hum);
        $scope.data[2].push(co2);
        console.log($scope.data[2].length); 

    }else{
    //     var temp =   Math.floor(Math.random() * 3) + 25  ;
    // var hum =    Math.floor(Math.random() * 10) +85  ;
    // var co2 =   Math.floor(Math.random() * 6) + 55  ;
    //     $scope.data[0].push(temp);
    //     $scope.data[1].push(hum);
    //     $scope.data[2].push(co2);
    }

 }

   $interval( function(){ 

    $scope.callAtInterval();
    
  }, 5000);
  



console.log($scope.data[2].length);
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
  $scope.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left',
          showLines:false,
          scaleOverride : true,
        scaleSteps : 10,
        scaleStepWidth : 100,
        scaleStartValue : 0
        },
        {
          id: 'y-axis-2',
          type: 'linear',
          display: true,
          position: 'right',
          showLines:false
        }
      ]
    }
  };

  }

})();
 