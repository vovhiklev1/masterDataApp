'use strict';

angular.module('myApp').controller('GeneralCtrl',

    function ($scope, $rootScope, $log, $filter, formDataFactory) {
        'use strict';
        /*    $scope.tabData = formDataFactory.navTabs;
         $scope.tabData.setActiveTab('generalTab');
         $rootScope.activeTab = $scope.tabData.getActiveTab('generalTab');*/
        $rootScope.generalTab = 'active';
        console.log('v1');
        // $scope.companyList =[CompanyA,]

        $scope.formData = formDataFactory;

       // $scope.formData.loadList('./settingsForm.json').then(function (response) {
        //    $scope.formData.responseDataS.set(response.data); //$scope.f.responseDataS.set(response.data.list, 'mail');
        //    console.log('loaded');
          //  $scope.updateView();
      //  });

        $scope.updateView = function () {
            var formFields = $scope.formData.responseDataS.get();
            // = formFields.fields;
            $scope.company = formFields.fields[0].CompanyOfReporter;
            //  console.log($scope.company.length );

            var wellNumber = formFields.fields[1].WellNumber[0];

            // var wellNumberKeys = [];
            // keys= Object.keys(wellNumber);
            //  angular.forEach(Object.keys(wellNumber), function (key, val) {
            //      wellNumberKeys.push(Object.keys(wellNumber[key]))
            //   });
            /*angular.forEach(Object.keys(wellNumber), function (key, val) {
             keys.push(wellNumber[val]);
             });*/
            // console.log(Object.keys(wellNumber)); //(Object.keys(wellNumber[0]))

            $scope.wellNumberKeys = Object.keys(wellNumber);
            $scope.wellNumberSelected =$scope.wellNumberKeys[0];

            $scope.$watch('wellNumberSelected', function () {
                var selected = $scope.wellNumberSelected;
                if (selected) {
                    $scope.region = wellNumber[selected][0].Region;
                    $scope.state = wellNumber[selected][1].State;
                    $scope.fieldOffice = wellNumber[selected][2].FieldOffice;

                //   console.log(wellNumber[selected][0].Region + ' val weel');
                   /* angular.forEach(wellNumber, function (key, val) {
                       if(val==)
                    });*/
                }


               // console.log(selected + ' selected well');
            });


        };

        $scope.updateView();


        /*{
         "company": [
         {
         "name": "CompanyA"
         },
         {
         "name": "CompanyB"
         },
         {
         "name": "CompanyC"
         },
         {
         "name": "CompanyD"
         }
         ]
         }*/

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


        $scope.$watch('data.dateDropDownWithInput', function () {
            $scope.formattedDate = $filter('date')($scope.data.dateDropDownWithInput, 'dd/MM/yyyy hh:mm a')
                || $filter('date')(new Date(), 'dd/MM/yyyy hh:mm a');
            //console.log($scope.data.dateDropDownWithInput+' ll')
        });
        //  $scope.formattedDate = $filter('date')(new Date(), 'dd/MM/yyyy HH:mm a');


    }
);