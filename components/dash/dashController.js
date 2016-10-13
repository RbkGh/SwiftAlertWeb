angular.module('swiftAlert')
    .controller('dashController', ['$location', 'Auth', 'User', '$localStorage', function($location, Auth, User, $localStorage) {
        var dash = this;

        dash.logout = logout;
        dash.refreshBalance = refreshBalance;
        init();

        function init() {
            User.get()
                .then(function (userinfo) {
                    dash.userinfo = userinfo.responseObject;
                })
                .catch(function (response) {
                    console.error('Error', response.status, response.data);
                });
        }
        function refreshBalance(){
            init();
        };
        function logout() {
            Auth.Logout();
            $location.path('/login');
        };
    }]);
