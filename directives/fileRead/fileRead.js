/**
 * Created by Rodney on 04-Feb-16.
 */
//didn't make this an anonymous function.
(
  function(){
    'use strict';
angular
  .module('swiftAlert').
directive("fileRead", fileRead);


    function fileRead() {
  return {
    scope: {
      opts: '='
    },
    link: function ($scope, $elm, $attrs) {
      $elm.on('change', function (changeEvent) {
        var reader = new FileReader();
        reader.onload =function (evt) {
          $scope.$apply(function () {
            var data = evt.target.result;

            var workbook = XLSX.read(data, {type: 'binary'});

            var headerNames = XLSX.utils.sheet_to_json(
              workbook.Sheets[workbook.SheetNames[0]],
              { header: 1 }
            )[0];



            var data2 = XLSX.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[0]]);
            var arrayOfContacts = data2;

            var index;
            for	(index = 0; index < arrayOfContacts.length; index+=1) {
                $scope.opts.push(arrayOfContacts[index]);
            }
          });
        };

        reader.readAsBinaryString(changeEvent.target.files[0]);
      });
    }
  }
}})();
