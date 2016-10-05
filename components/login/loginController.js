angular.module('swiftAlert')
    .controller('loginController', ['$location', 'Auth', function($location, Auth) {
        var si = this;

       si.login = login;

       initController();

       function initController() {
           // reset login status
           Auth.Logout();
       };

       function login() {
           si.loading = true;
           Auth.Login(si.username, si.password, function (result) {
               if (result === true) {
                   $location.path('/');
               } else {
                   si.error = 'Username or password is incorrect';
                   si.loading = false;
               }
           });
       };

    }]);
