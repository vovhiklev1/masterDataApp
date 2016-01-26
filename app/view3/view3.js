'use strict';

angular.module('myApp')

    /*.config(['$routeProvider', function($routeProvider) {
     $routeProvider.when('/view2', {
     templateUrl: 'view2/view2.html',
     controller: 'View2Ctrl'
     });
     }])*/

    .controller('ReviewCtrl', function ($scope, $rootScope, $filter, $window, $location, formDataFactory) {
        /*      $scope.tabData = formDataFactory.navTabs;
         $scope.activeTab = $scope.tabData.setActiveTab('reviewTab');
         $rootScope.activeTab = $scope.tabData.getActiveTab('reviewTab');*/
        $rootScope.reviewTab = 'active';
        console.log('v3');

       // $scope.generalInfo=[];
        $scope.generalInfo = $scope.formData.fieldsDataS.getList();

      //  $scope.generalInfo = temp;
      //   console.log($scope.generalInfo)

        //$scope.generalInfo

        console.log('v3 ----');
        console.log($scope.generalInfo);
        console.log('v3 ----');



        $scope.correctiveActions = $scope.formData.sendDataS.correctiveActionList(false);
        // console.log($scope.correctiveActions);


        $scope.submitBtn = function () {

            $scope.formData.sendData($scope.formData.sendDataS.prepareSendObj());


        };
        //  $scope.submitBtn();


        $scope.submitEnable = function () {

          //  console.log('VALID RUN')
            $scope.formValid = false;
            var tableLimit = $scope.formData.settingsFormDataS.get().fields[3].tableLimit;
            var actionList = $scope.formData.actionListDataS.get();

            var fields = $scope.formData.fieldsDataS.getList();
            var fieldsValid = true;
            angular.forEach(fields, function (val, key) {
              //  console.log('========+++++====== ' + val.name + val.info)
                if (!val.info) {
                 //   console.log('==============' + val.name + val.info)
                    fieldsValid = false;
                }

            });

            if (actionList.length <= tableLimit && actionList.length >= 1 && fieldsValid) {
                $scope.formValid = true;
               // alert('valid')
            }
            ;
        }
        ;
        $scope.submitEnable();


        $scope.nawTab = function () {
            $scope.submitBtn();



        };


    }
)
;