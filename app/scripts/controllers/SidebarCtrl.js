(function () {
  'use strict';


   angular
    .module('tsl.controllers')
    .controller('SidebarCtrl', SidebarCtrl);


   function SidebarCtrl($scope) {

   
    $scope.template = {'sidebar': 'templates/sidebar.tpl.html'};
}

})();
 