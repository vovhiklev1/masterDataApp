'use strict';

angular.module('myApp')

    /*.config(['$routeProvider', function($routeProvider) {
     $routeProvider.when('/view2', {
     templateUrl: 'view2/view2.html',
     controller: 'View2Ctrl'
     });
     }])*/

    .controller('CorrectiveCtrl',

    function ($scope, $rootScope, $log, $filter, formDataFactory) {
        'use strict';

        $scope.actionData = formDataFactory.actionListDataS;
        $scope.formData = formDataFactory;
        /* $scope.tabData = formDataFactory.navTabs;
         $scope.tabData.setActiveTab('actionTab');
         $rootScope.activeTab = $scope.tabData.getActiveTab('actionTab');*/
        $rootScope.actionTab = 'active';
        console.log('v2');


        /*    var d = new Date();
         var mm = d.getMonth()+1;
         var dd = d.getDate();
         var yyyy = d.getFullYear();
         var dateStr = mm + '/' + dd + '/' + yyyy;*/
        /*$scope.modalActionDate = new Date();*/
        // console.log('dateStr' + $scope.modalActionDate);
        //  $filter('date')(new Date(),"yyyy-MM-dd");

        $scope.actionList = [];
        var itemAction = {};

        $scope.update = function () {
            $scope.actionList = $scope.actionData.get();
            $scope.$watch('actionList', function () {
                //   console.log('$watch $scope.actionList.length before: ' + $scope.actionList.length)
                if (!$scope.actionList.length) {
                    $scope.emptyList = true;
                } else {
                    $scope.emptyList = false;
                }
            });
            $scope.actionList = $scope.actionData.get();

            //console.log('$watch $scope.actionList.length after: ' + $scope.actionList.length)
            //  console.log($scope.actionList)
        };

        $scope.update();

        $scope.removeRow = function (idx) {
            $scope.actionData.remove(idx);
            $scope.update();
            //console.log('removeRow' + idx);
        };

        var itemIdxEditMode = undefined;

        $scope.editRow = function (idx) {
            $scope.EditMode = true;
            itemIdxEditMode = idx;
            var currItem = $scope.actionList[idx];
            $scope.modalActionDescription = currItem.description;
            $scope.modalActionName = currItem.name;
            $scope.modalActionCompany = currItem.company;
            $scope.modalActionDate = currItem.date;
            //  $scope.update();
            console.log('editRow ' + idx);
        };

        $scope.edit = function () {
            console.log('edit start ' + itemIdxEditMode);


            if (itemIdxEditMode !== undefined) {
                console.log('edit start true ' + itemIdxEditMode);
                $scope.modalApply(itemIdxEditMode)
                $scope.dismiss();
            };

        };

        $scope.addRow = function () {
            $scope.EditMode = false;
            $scope.modalActionDate = new Date();
            var formFields = $scope.formData.responseDataS.get();
            $scope.company = formFields.fields[0].CompanyOfReporter;


            // var watchCollection = ['modalActionDescription', 'modalActionName', 'modalActionCompany', 'modalActionDate'];
            $scope.$watch('modalActionDescription', function () {
                //itemAction = {};
                itemAction.description = $scope.modalActionDescription;
            });
            $scope.$watch('modalActionName', function () {
                // itemAction = {};
                itemAction.name = $scope.modalActionName;
            });
            $scope.$watch('modalActionCompany', function () {
                // itemAction = {};
                itemAction.company = $scope.modalActionCompany;

            });
            $scope.$watch('modalActionDate', function () {
                // itemAction = {};
                itemAction.date = $scope.modalActionDate;
                //   console.log(itemAction.date + ' modalActionDate')
            });
        };

        $scope.close = function () {
            $scope.dismiss();
            $scope.modalApply();
        };


        $scope.modalApply = function (idx) {
            //console.log('modalApply name  ' + itemAction.name);

            console.log('add');

            itemAction.description = $scope.modalActionDescription;
            itemAction.name = $scope.modalActionName;
            itemAction.company = $scope.modalActionCompany;
            itemAction.date = $scope.modalActionDate;

            $scope.EditMode ? $scope.actionData.edit(idx, itemAction) : $scope.actionData.set(itemAction);
            $scope.update();
            itemAction = {};
            // console.log($scope.actionList);

            $scope.modalActionDescription = '';
            $scope.modalActionName = '';
            $scope.modalActionCompany = '';
            $scope.modalActionDate = new Date();

            /* angular.forEach($scope.actionList, function (key, val) {
             console.log($scope.actionList[val])
             });*/
            //  console.log($scope.actionList.length );
        };


        $scope.controllerName = 'demoController';

        moment.locale('en');

        $scope.data = {
            guardians: [
                {
                    name: 'Peter Quill',
                    dob: null
                },
                {
                    name: 'Groot',
                    dob: null
                }
            ]
        };

        $scope.checkboxOnTimeSet = function () {
            $scope.data.checked = false;
        };

        $scope.inputOnTimeSet = function (newDate) {
            // If you are not using jQuery or bootstrap.js,
            // this will throw an error.
            // However, can write this function to take any
            // action necessary once the user has selected a
            // date/time using the picker
            $log.info(newDate);
            $('#dropdown3').dropdown('toggle');
        };

        $scope.getLocale = function () {
            return moment.locale();
        };

        $scope.setLocale = function (newLocale) {
            moment.locale(newLocale);
        };


        $scope.guardianOnSetTime = function ($index, guardian, newDate, oldDate) {
            $log.info($index);
            $log.info(guardian.name);
            $log.info(newDate);
            $log.info(oldDate);
            angular.element('#guardian' + $index).dropdown('toggle');
        };

        $scope.beforeRender = function ($dates) {
            var index = Math.ceil($dates.length / 2);
            $log.info(index);
            $dates[index].selectable = false;
        };

        $scope.config = {
            datetimePicker: {
                startView: 'year'
            }
        };

        $scope.configFunction = function configFunction() {
            return {startView: 'month'};
        };

        $scope.config = {
            configureOnConfig: {
                startView: 'year',
                configureOn: 'config-changed'
            },
            renderOnConfig: {
                startView: 'year',
                renderOn: 'valid-dates-changed'
            }
        };

        var validViews = ['year', 'month', 'day', 'hour', 'minute'];

        $scope.changeConfig = function changeConfig() {
            var newIndex = validViews.indexOf($scope.config.configureOnConfig.startView) + 1;
            console.log(newIndex);
            if (newIndex >= validViews.length) {
                newIndex = 0;
            }
            $scope.config.configureOnConfig.startView = validViews[newIndex];
            $scope.$broadcast('config-changed');
        };

        var selectable = true;

        $scope.renderOnBeforeRender = function ($dates) {
            angular.forEach($dates, function (dateObject) {
                dateObject.selectable = selectable;
            });
        };

        $scope.renderOnClick = function renderOnClick() {
            selectable = (!selectable);
            $scope.$broadcast('valid-dates-changed');
        };


        $scope.formattedDate = $filter('date')(new Date(), 'dd/MM/yyyy HH:mm a');
        /*   $scope.$watch('data.dateDropDownWithInput', function(){
         $scope.formattedDate = $filter('date')($scope.data.dateDropDownWithInput, 'dd/MM/yyyy HH:mm a');
         console.log($scope.data.dateDropDownWithInput+' ll')
         });*/


    }
);