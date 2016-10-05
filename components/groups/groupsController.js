angular.module('swiftAlert')
    .controller('groupsController', ['$location', 'Auth', 'Groups', '$localStorage', function($location, Auth, Groups, $localStorage) {
        var sett = this;
        Groups.getGroups($localStorage.currentUser.userName,function (result) {
            console.log(result);
        });
    }]);
