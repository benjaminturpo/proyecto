(function () {
  'use strict';

  // /* @ngInject */
  angular
    .module('tsl', ['ngRoute','tsl.controllers','tsl.directives','tsl.templates','tsl.services', 'tsl.filters',
                    'ui.bootstrap','ngAnimate','ngTouch','ui.select','ngSanitize', 'oitozero.ngSweetAlert','chart.js',
                    'datatables','datatables.bootstrap','angularMoment','toastr','io-barcode','angular-ladda'

      ])
    .config(config)
    .run(dtLanguageConfig);


    function dtLanguageConfig(DTDefaultOptions){
       DTDefaultOptions.setLanguageSource('./scripts/Spanish.json');
      };


 
  function config ($locationProvider, $routeProvider, $httpProvider) {
    // $locationProvider.html5Mode(true);

     $httpProvider.defaults.headers.common = {};
      $httpProvider.defaults.headers.post = {};
      $httpProvider.defaults.headers.put = {};
      $httpProvider.defaults.headers.patch = {};
      $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
      


    $routeProvider
      .when('/', {
        templateUrl: 'templates/login.tpl.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
    .when('/lecturas', {
        templateUrl: 'templates/lecturas.tpl.html',
        controller: 'LecturasCtrl',
        activeMenu: 'lecturas'

      })

     .when('/registros', {
        templateUrl: 'templates/registros.tpl.html',
        controller: 'RegistrosCtrl',
        activeMenu: 'registros'
      })
    .when('/sensores', {
        templateUrl: 'templates/sensores.tpl.html',
        controller: 'SensoresCtrl',
        activeMenu: 'sensores' 
      })

     

      .otherwise({ reditrectTo : "/" });
  }

   

})();

