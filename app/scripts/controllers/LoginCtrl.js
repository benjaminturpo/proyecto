(function () {
  'use strict';


   angular
    .module('tsl.controllers')
    .controller('LoginCtrl', LoginCtrl);


   function LoginCtrl($scope, $route,$rootScope, $location, $window, Login,$http) {
    $scope.error = false; 
   $scope.user = {};
   $scope.ingresar = function(user){
   	  

     // $location.path('/admin');
   
      var p =  $scope.user.pass;
        
          if(p === 'hongos')
          {
             
         $rootScope.menuToggle = 1;  
               $location.path('/lecturas');

          }
          else
          {
              $scope.error = true;
          }
    }
    
}

})();
 