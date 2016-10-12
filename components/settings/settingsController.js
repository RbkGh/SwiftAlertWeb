angular.module('swiftAlert')
    .controller('settingsController', ['$location', '$timeout', 'User', '$localStorage', function($location, $timeout, User, $localStorage) {
        var sett = this;
        sett.changePassword = changePassword;

        function changePassword() {
            if (sett.currentPassword && sett.newPassword ) {
                var data = {
                    userId: $localStorage.currentUser.userId,
                    currentPassword: sett.currentPassword,
                    newPassword: sett.newPassword
                }

                User.changePassword(data)
                    .then(function (response) {
                        console.log(response);
                        if (response) {
                            if (response.status == 11) {
                                sett.emessage = response.message;
                            } else {
                                sett.smessage = response.message;
                            }
                            $timeout(function () {
                                sett.emessage = '';
                                sett.smessage = '';
                            }, 7000);
                        } else {
                            sett.emessage = 'An error occured try again';
                            $timeout(function () {
                                sett.emessage = '';
                                sett.smessage = '';
                            }, 7000);
                        }
                    })
                    .catch(function(response) {
                        sett.emessage = 'An error occured try again';
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
