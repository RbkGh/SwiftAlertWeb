angular.module('swiftAlert')
    .controller('reportsController', ['$location', 'Auth', 'Reports', '$localStorage', '$state', function($location, Auth, Reports, $localStorage, $state) {
        var rep = this;
        rep.viewReport = viewReport;
        initController();


        function initController() {
            Reports.get($localStorage.currentUser.userName)
                .then(function (reports) {
                   rep.reports = reports;
                })
                .catch(function(response) {
                    console.error('Error', response.status, response.data);
                });
        };

        function viewReport($event) {
            var row = $event.currentTarget;
            $state.go('dash.report', {messageid:row.dataset.messageid});
        }
    }]);
