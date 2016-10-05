angular.module('swiftAlert')
    .controller('homeController', ['$location', function($location) {
        $location.path('/login')
    }]);
