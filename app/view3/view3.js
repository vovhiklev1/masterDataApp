'use strict';

angular.module('myApp')

    /*.config(['$routeProvider', function($routeProvider) {
     $routeProvider.when('/view2', {
     templateUrl: 'view2/view2.html',
     controller: 'View2Ctrl'
     });
     }])*/

    .controller('ReviewCtrl', function ($scope, $rootScope, $filter, $window,$location, formDataFactory) {
        /*      $scope.tabData = formDataFactory.navTabs;
         $scope.activeTab = $scope.tabData.setActiveTab('reviewTab');
         $rootScope.activeTab = $scope.tabData.getActiveTab('reviewTab');*/
        $rootScope.reviewTab = 'active';
        console.log('v3');

        $scope.generalInfo = $scope.formData.fieldsDataS.getList();
        console.log('v3 ----');
        console.log($scope.generalInfo);
        console.log('v3 ----');


        /*  $scope.correctiveActions = $scope.formData.actionListDataS.get();
         console.log('v3 ----correctiveActions');
         console.log($scope.correctiveActions);
         console.log('v3 ----correctiveActions');*/


       /* var correctiveActionList = function (submit) {
            $scope.correctiveActions = $scope.formData.actionListDataS.get();
            var actionCount = Object.keys($scope.correctiveActions).length;
            //  console.log('actionCount ------' + actionCount);
            //  console.log(actionCount);

            var arr = [];
            var create = function (name, values) {
                if (name) {
                    var obj = {};
                    obj.name = name;
                    obj.values = values;
                    obj.info = false;
                    arr.push(obj);
                    // form.countItems = list.length;
                    //  console.log('create: ' + arr);
                }
                ;
            };

            angular.forEach($scope.correctiveActions, function (val, key) {
                // console.log('correctiveActions val------');
                // console.log(key);
                var idxStr = '';
                if (actionCount > 0) {
                    key += 1;
                    idxStr = ' (' + key + ')';
                }
                var date = submit ? $filter('dateISOFilter')(val.date) : $filter('dateFilter')(val.date);

                create("Description of Corrective Action" + idxStr, val.description, true);
                create("Action Taken By (name)" + idxStr, val.name, true);
                create("Company" + idxStr, val.company, true);
                create("Date" + idxStr, date, true);
            });
            return arr
        };*/
        // console.log('++++');
        $scope.correctiveActions = $scope.formData.sendDataS.correctiveActionList(false);
        // console.log($scope.correctiveActions);


        $scope.submitBtn = function () {

            $scope.formData.sendData($scope.formData.sendDataS.prepareSendObj());

            /*var generalFields = $scope.formData.fieldsDataS.getList();
            var actionList = $scope.formData.sendDataS.correctiveActionList(true);
            //console.log(generalFields)
            console.log('5555555555555');
            angular.forEach(actionList, function (val, key) {
               // console.log(val)
                generalFields.push(val);
            });
            console.log(generalFields);

            var jsonObj = {};
            jsonObj.workflowCreationInformation = {
                "workflowTypeName": "Incident Report",
                "name": "Report - 2013.05.09"
            };
            jsonObj.workflowStepUpdateInformation = {
                "stepIdOrName": "Initial Step",
                "fields": []
            };*/
            //console.log(m)
        };
        //  $scope.submitBtn();




        $scope.nawTab = function () {
            $scope.submitBtn();
         //   if (event.ctrlKey) {
                // window.open('https://www.google.com', '_blank'); // in new tab
         //   } else {
                //  $location.path('https://www.google.com'); // in same tab
              //  window.open('/Home/PanelGoster', '_blank'); // in new tab
          //  }

            /*var data = {
                "fName": "$scope.firstName",
                "lName": "$scope.lastName"
            };*/
            //var postData = JSON.stringify(data)

           // var data =JSON.stringify(data1)
          //  $scope.formData.sendData(postData);
            /*then(function (response) {
             // success
             //$scope.updateView();
             console.log("sendData success  ");
             },
             function (response) {
             console.log("sendData failed  ");
             }*/



        };


    });