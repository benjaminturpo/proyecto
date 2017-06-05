(function () {
  'use strict';


   angular
    .module('tsl.controllers')
    .controller('MenuCtrl', MenuCtrl);


   function MenuCtrl ($scope,$rootScope,$route,$location, $window) {

    $scope.$route = $route;
    $scope.template = {'admin': 'templates/menu.tpl.html', 'direccion': 'templates/direcciones/menu.tpl.html'};
    $rootScope.menuToggle = 0;    
    // $scope.menuAdmin = true;    
     $scope.nombre = $window.localStorage.getItem('name');
    // $scope.menutsl = true;    
    $scope.salir = function(){
        $window.localStorage.setItem('id', '');
           $window.localStorage.setItem('user', '');
           $window.localStorage.setItem('name', '');
           // 

           $rootScope.menuToggle = 0;  
          $window.location.href = '#!/'
            
     }

    

     

       $scope.$on('$routeChangeSuccess', function() {
          $scope.nombre = $window.localStorage.getItem('name');
       var rol = $window.localStorage.getItem('rol');
       var path = $location.path();
       console.log(path);
 
    if(path === '/lecturas' || path === '/registros' || path === '/sensores' ){
$scope.menuToggle = 1;    
    }else{
      $scope.menuToggle = 0;   
    }
        // 


    });
}

})();
 