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
                    console.log(response);
                      return response.data.responseObject;
                  },
                  function fail(e) {
                    console.log(e);
                      return e;
              });
            // $.get( ROOT+'/api/v2/groups/'+username, function( response ) {
            //     if (response) {
            //         console.log(response);
            //         callback(response);
            //     } else {
            //         callback(false);
            //     }
            // });
            // var settings = {
            //   "async": true,
            //   "crossDomain": true,
            //   "url": "http://212.111.42.10:8080/swiftalertmain/api/v2/groups/"+username,
            //   "method": "GET",
            //   "headers": {
            //     "authorization": 'Bearer ' + $localStorage.currentUser.token,
            //     "content-type": "application/x-www-form-urlencoded"
            //   }
            // }
            //
            // $.ajax(settings).done(function (response) {
            //   callback(response.responseObject);
            // });

            // console.log($http.defaults.headers);
            // $http.defaults.headers.get["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8;";
            // $http.get(ROOT+'/api/v2/groups/'+username, {headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}})
            //     .success(function (response) {
            //         if (response) {
            //             console.log(response);
            //             callback(response);
            //         } else {
            //             callback(false);
            //         }
            //     });
        }
    }
})();
