angular.module('swiftAlert')
    .controller('reportsController', ['$location', 'Auth', 'Reports', '$localStorage', function($location, Auth, Reports, $localStorage) {
        var rep = this;

        initController();

        function initController() {
            Reports.get($localStorage.currentUser.userName)
                .then(function (reports) {
                   rep.reports = reports;
                  console.log(reports);
                })
                .catch(function(response) {
                    console.error('Error', response.status, response.data);
                });
        };
    }]);
