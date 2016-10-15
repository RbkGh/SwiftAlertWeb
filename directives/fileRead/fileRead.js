/**
 * Created by Rodney on 04-Feb-16.
 */
//didn't make this an anonymous function.
//made new changes,not fully tested yet
(function () {
    'use strict';
    angular
        .module('swiftAlert').directive("fileRead", fileRead);


    function fileRead() {
        return {
            scope: {
                opts: '='
            },
            link: function ($scope, $elm, $attrs) {
                $elm.on('change', function (changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function (evt) {
                        $scope.$apply(function () {
                            var data = evt.target.result;

                            var workbook = XLSX.read(data, {type: 'binary'});

                            var headerNames = XLSX.utils.sheet_to_json(
                                workbook.Sheets[workbook.SheetNames[0]],
                                {header: 1}
                            )[0];


                            var data2 = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
                            var arrayOfContacts = data2;

                            var index;
                            for (index = 0; index < arrayOfContacts.length; index += 1) {
                                var currentObj = arrayOfContacts[index];
                                var rebuiltIndex = [];
                                // build the index
                                for (var x in currentObj) {
                                    rebuiltIndex.push(x);
                                }
                                // sort the index
                                rebuiltIndex.sort(function (a, b) {
                                    return a == b ? 0 : (a > b ? 1 : -1);
                                });
                                //now we can get json value via index in order to transform the header names in the order of firstName,lastName and contactPhoneNum
                                var finalCurrentObj = {
                                    firstName: currentObj[rebuiltIndex[0]],
                                    lastName: currentObj[rebuiltIndex[1]],
                                    contactPhoneNum: currentObj[rebuiltIndex[2]]
                                }


                                $scope.opts.push(finalCurrentObj);
                            }

                        });
                    };

                    reader.readAsBinaryString(changeEvent.target.files[0]);
                });
            }
        }
    }
})();
