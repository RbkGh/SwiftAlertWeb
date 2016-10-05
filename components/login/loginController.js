angular.module('swiftAlert')
    .controller('loginController', ['$location', 'Auth', function($location, Auth) {
        var vm = this;

       vm.login = login;

       initController();

       function initController() {
           // reset login status
           Auth.Logout();
       };

       function login() {
           vm.loading = true;
           Auth.Login(vm.username, vm.password, function (result) {
               if (result === true) {
                   $location.path('/');
               } else {
                   vm.error = 'Username or password is incorrect';
                   vm.loading = false;
               }
           });
       };
    }]);
