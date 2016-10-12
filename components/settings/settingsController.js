angular.module('swiftAlert')
    .controller('settingsController', ['$location', 'Auth', 'User', '$localStorage', function($location, Auth, User, $localStorage) {
        var sett = this;
        sett.changePassword = changePassword;

        function changePassword() {
            if (sett.currentPassword && sett.newPassword ) {
                var data: {
                    userId: $localStorage.currentUser.userId,
                    currentPassword: sett.currentPassword,
                    newPassword: sett.newPassword
                }

                User.changePassword(data)
                    .then(function (response) {
                        if (response) {
                            if (response.status == 11) {
                                console.log(response.message);
                                sett.emessage = response.message;
                            } else {
                                sett.smessage = response.message;
                            }
                            initController();
                            $timeout(function () {
                                sett.emessage = '';
                                sett.smessage = '';
                            }, 7000);
                        } else {
                            sett.emessage = 'An error occured try again';
                            sett.sending = false;
                            initController();
                            $timeout(function () {
                                sett.emessage = '';
                                sett.smessage = '';
                            }, 7000);
                        }
                    })
                    .catch(function(response) {
                        sett.emessage = 'An error occured try again';
                        sett.sending = false;
                        initController();
                        $timeout(function () {
                            sett.emessage = '';
                            sett.smessage = '';
                        }, 7000);
                    });
            } else {
                sett.emessage = 'Field(s) empty';
            }

        }
    }]);
