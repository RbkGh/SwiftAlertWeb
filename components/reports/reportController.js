angular.module('swiftAlert')
    .controller('reportController', ['$location', 'Auth', 'Reports', '$localStorage', '$stateParams', function($location, Auth, Reports, $localStorage, $stateParams) {
        var rept = this;
        rept.params = $stateParams;

        initController();


        function initController() {
            Reports.getDetailed(rept.params.messageid)
                .then(function (report) {
                   rept.dreportMessage = report.responseObject.message;
                   rept.dreportSenderId = report.responseObject.reportDetailedList[0].senderId;
                   rept.dreport = report.responseObject.reportDetailedList;
                   console.log(report);
                })
                .catch(function(response) {
                    console.error('Error', response.status, response.data);
                });
        };
    }]);
