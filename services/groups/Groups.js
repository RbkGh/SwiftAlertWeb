(function () {
    'use strict';

    angular
        .module('swiftAlert')
        .factory('Groups', Service);

    function Service($http, $localStorage) {
        var service = {};
        var ROOT = "http://212.111.42.10:8080/swiftalertmain"

        service.get = get;
        service.update = update;
        service.create = create;

        return service;

        function get(username) {
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
        function update(data) {
          return $http({
                      method: 'PUT',
                      url: ROOT+'/api/v2/groups/group',
                      headers: {'Content-Type': 'application/json;charset=UTF-8'},
                      data: data
              }).then(
                  function success(response) {
                      return response.data;
                  },
                  function fail(e) {
                    console.log(e);
                      return e;
              });
        }
        function create(data) {
          return $http({
                      method: 'POST',
                      url: ROOT+'/api/v2/groups/group',
                      headers: {'Content-Type': 'application/json;charset=UTF-8'},
                      data: data
              }).then(
                  function success(response) {
                      return response.data;
                  },
                  function fail(e) {
                    console.log(e);
                      return e;
              });
        }
    }
})();
