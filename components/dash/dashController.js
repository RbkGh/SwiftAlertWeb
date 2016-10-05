angular.module('swiftAlert')
    .controller('dashController', ['$location', 'Auth', 'Groups', '$localStorage', function($location, Auth, Groups, $localStorage) {
        var dash = this;
        
        dash.logout = logout;

        function logout() {
            Auth.Logout();
            $location.path('/login');
        };
    }]);
