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

  angular
  .module('tsl.services', ['ngResource'])
  //.constant('BaseUrl', 'http://api.educaciondigitaltuc.gob.ar/api-tsl/public_html/index.php')
  .constant('BaseUrl', 'http://localhost/tsl/public')
  // .constant('BaseUrl', 'http://bit0.io/tsl/tsl/public')
  // .constant('BaseUrl', 'http://lumen.innovacioneducativa.gob.ar')
  .factory('Login', Login)
  .factory('dateSerializer', dateSerializer);
})();