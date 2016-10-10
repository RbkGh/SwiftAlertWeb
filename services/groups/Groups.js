(function () {
    'use strict';

    angular
        .module('swiftAlert')
        .factory('Groups', Service);

    function Service($http, $localStorage) {
        var service = {};
        var ROOT = "http://212.111.42.10:8080/swiftalertmain"

        service.getGroups = getGroups;

        return service;

        function getGroups(username) {
          return $http({
                      method: 'GET',
                      url: ROOT+'/api/v2/groups/'+username,
                      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                      data:{}
              }).then(
                  function success(response) {
                      return response.data.responseObject;
                  },
                  function fail(e) {
                    console.log(e);
                      return e;
              });
        }
    }
})();
