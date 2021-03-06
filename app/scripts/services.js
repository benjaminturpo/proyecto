(function(){
  'use strict';



  
  function Login($resource, BaseUrl){
   return $resource(BaseUrl + '/usuarios/login/:user/:pass', { user: '@_user', pass: '@_pass'});
  }
 function dateSerializer(DateTimeUtilities) {
    function DateSerializer() {
    }
    DateSerializer.prototype.serialize = function (value) {
        return value;
    };
    DateSerializer.prototype.deserialize = function (jsonDate) {
        if (angular.isDate(jsonDate)) { 
            return jsonDate;
        }
        return DateTimeUtilities.getLocalDate(jsonDate);
    };
    return DateSerializer;
}
function Arduino(Address, $http){
  // var device = new Device(Address);
  return{
    getData:getData,
    setPin:setPin,
    leerPin:leerPin
  }
  function getData(){
      return $http({
        method: 'GET',
        url: 'http://' + Address ,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }).then(function(res) {
        return res;
      });
  }

  function setPin(pin, state){
      return $http({
        method: 'GET',
        url: 'http://' + Address  + '/digital/' + pin + '/' + state,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }).then(function(res) {
        return res.data;
      });



      }

  function leerPin(pin){
      return $http({
        method: 'GET',
        url: 'http://' + Address  + '/digital/' + pin,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }).then(function(res) {
        return res.data;
      });



      }



  }




  angular
  .module('tsl.services', ['ngResource'])
  .constant('Address', '192.168.1.100:8000')
  .constant('BaseUrl', '')
  // .constant('BaseUrl', 'http://localhost/tsl/public')
  // .constant('BaseUrl', 'http://bit0.io/tsl/tsl/public')
  // .constant('BaseUrl', 'http://lumen.innovacioneducativa.gob.ar')
  .factory('Arduino', Arduino)
  .factory('Login', Login)
  .factory('dateSerializer', dateSerializer);
})();