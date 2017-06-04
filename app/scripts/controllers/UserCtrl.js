(function () {
  'use strict';


  angular
    .module('tsl.controllers')
    .controller('UserCtrl', UserCtrl);


  function UserCtrl($scope, $route,$rootScope, $window, toastr,Cliente,Carton,Admin, DTOptionsBuilder) {
   
       $scope.dtOptions = DTOptionsBuilder.newOptions()
                      .withBootstrap();
                      // .withOption('order', [1, 'desc']);

      $rootScope.categorias = [];
      $rootScope.clientes = [];
$rootScope.usuario = {};

$scope.noExiste = false;


    $rootScope.agregarCliente = function(user){
      Cliente.getCliente(user.DNI).then(function(res){
     console.log('res',res);
          var len = res.length;
          if(!len){

                  Cliente.addCliente(user).then(function(res){

        toastr.success("El cliente fue creado correctamente");
            Cliente.getAllCliente().then(function(res){
            $rootScope.clientes = res;
            $rootScope.usuario = {};
            })


      })
          }
          else
          {
            alert('El usuario ya esta registrado');
            toastr.error("El DNI ingresado ya posee un registro");
             $rootScope.usuario = {};
          }
      })


      // console.log('nuevo usuario', $rootScope.afterUsuario);

    }


























Cliente.getAllCliente().then(function(res){
$rootScope.clientes = res;
})




    Admin.getCat().then(function(res) {

      for (var i = 0; i < res.length; i++) {
            $rootScope.categorias.push({id: res[i].id, Nombre:res[i].Nombre})
      }
    console.log('$scope.categorias',$rootScope.categorias)
    })

$rootScope.rutas = [];

    Admin.getRuta().then(function(res) {

      for (var i = 0; i < res.length; i++) {
            $rootScope.rutas.push({id: res[i].id, Nombre:res[i].Nombre})
      }
    console.log('$scope.rutas',$rootScope.rutas)
    })

  }

})();
 