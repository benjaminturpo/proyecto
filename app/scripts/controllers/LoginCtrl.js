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
        
          if(p === 'hongosj')
          {
             
         $rootScope.menuToggle = 1;  
               $location.path('/admin/lecturas');

          }
          else
          {
              $scope.error = true;
          }
    }
    
}

})();
 