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
            var formFields = $scope.formData.settingsFormDataS.get();
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
            $scope.wellNumberSelected = $scope.wellNumberKeys[0];

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
            $scope.incidentDate = $filter('date')($scope.data.dateDropDownWithInput, 'MM/dd/yyyy hh:mm a')
                || $filter('date')(new Date(), 'MM/dd/yyyy hh:mm a');
            //console.log($scope.data.dateDropDownWithInput+' ll')
        });
        //  $scope.formattedDate = $filter('date')(new Date(), 'dd/MM/yyyy HH:mm a');


        var writeChanges = function (name, value, info) {
            console.log('write ' + name);
            // $scope.formData.fieldsDataS.getData('Date and Time of Incident');
            $scope.formData.fieldsDataS.setData(name, value, info);
            $scope.formData.fieldsDataS.getData(name);
        };

        $scope.$watch('incidentDate', function () {
            if (
                $scope.datePickerWithInputForm.formDateValue.$error.required !== true && !$scope.datePickerWithInputForm.formDateValue.$invalid

            ) {
                //  console.log('ok');
                writeChanges('Date and Time of Incident',$filter('dateISOFilter')($scope.incidentDate) , true)
            } else {
                //  console.log('err');
                writeChanges('Date and Time of Incident', $filter('dateISOFilter')($scope.incidentDate), false)
            }

        });

        $scope.$watch('reporterName', function () {
            if ($scope.generalForm.name.$error.required !== true &&
                $scope.generalForm.name.$dirty &&
                $scope.generalForm.name.$invalid !== undefined
            ) {
                //  console.log('ok');
                writeChanges('Reported By', $scope.reporterName, true)
            } else {
                //   console.log('err');
                writeChanges('Reported By', $scope.reporterName, false)
            }
            ;
            // var getInfo = $scope.formData.reportDataS.change();
            // console.log(getInfo)

            /*var arr = [
             {"name": "A", "values": "a1"},
             {"name": "B", "values": "b1"}];

             var getData = function (findKey) {
             if (findKey) {
             angular.forEach(arr, function (key, val) {
             // var item = Object.keys(val);
             // key.name+='e'
             if (key.name == findKey) {
             console.log(key.name + ' ' + key.values)
             }
             //angular.forEach(arr[key], function (key2, val2) {
             // })
             });
             }
             };
             var setData = function (findKey, newValue) {
             if (findKey) {
             angular.forEach(arr, function (key, val) {
             // var item = Object.keys(val);
             // key.name+='e'
             if (key.name == findKey) {
             key.values = newValue;
             //console.log(key.name + ' ' + key.values)
             }
             //angular.forEach(arr[key], function (key2, val2) {
             // })
             });
             }
             };*/

            // console.log($scope.generalForm.reporterName)
            //  $scope.formData.fieldsDataS.getData('Date and Time of Incident');
            //  $scope.formData.fieldsDataS.setData('Date and Time of Incident',$scope.reporterName);
            //  $scope.formData.fieldsDataS.getData('Date and Time of Incident');


        });


        $scope.$watch('reporterCompany', function () {
            if ($scope.generalForm.company.$error.required !== true &&
                $scope.generalForm.company.$dirty &&
                $scope.generalForm.company.$invalid !== undefined
            ) {
                //  console.log('ok');
                writeChanges('Company of Reporter', $scope.reporterCompany, true)
            } else {
                //   console.log('err');
                writeChanges('Company of Reporter', $scope.reporterCompany, false)
            }
            ;
        });

        $scope.$watch('reporterNumber', function () {
            // var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@example\.com$/i;
            var EMAIL_REGEXP = /^\(?(\d{3})\)?[.-](\d{3})[.-](\d{4})$/;

            if (/*$scope.generalForm.number.$error.required !== true &&
                 $scope.generalForm.number.$dirty &&
                 $scope.generalForm.number.$invalid !== undefined*/
                EMAIL_REGEXP.test($scope.reporterNumber)
            ) {
                console.log('ok');
                writeChanges('Contact Number', $scope.reporterNumber, true)
            } else {
                console.log('err');
                writeChanges('Contact Number', $scope.reporterNumber, false)
            }
            ;
        });

        $scope.$watch('reporterSupervisor', function () {

            writeChanges('Supervisor Name', $scope.reporterSupervisor, true)

        });

        $scope.$watch('reporterDescription', function () {
            if ($scope.generalForm.description.$error.required !== true &&
                $scope.generalForm.description.$dirty &&
                $scope.generalForm.description.$invalid !== undefined
            ) {
                //  console.log('ok');
                writeChanges('High Level Description of Incident', $scope.reporterDescription, true)
            } else {
                //   console.log('err');
                writeChanges('High Level Description of Incident', $scope.reporterDescription, false)
            }
            ;
        });

        $scope.$watch('wellNumberSelected', function () {

            //  console.log('ok');
            writeChanges('Well Number', $scope.wellNumberSelected, true)

        });

        $scope.$watch('region', function () {
            //  console.log('ok');
            writeChanges('Region', $scope.region, true);
        });
        $scope.$watch('state', function () {
            //  console.log('ok');
            writeChanges('State', $scope.state, true);
        });
        $scope.$watch('fieldOffice', function () {
            //  console.log('ok');
            writeChanges('Field Office', $scope.fieldOffice, true);
        });

        $scope.severity = {
            value1: false,
            value2: false,
            value3: false,
            value4: false,
            value5: false,
            value6: false
        };
        var formFields = $scope.formData.settingsFormDataS.get();
        $scope.severity2 = formFields.fields[2].IncidentSeverity;

        var searchKey = function (find) {
                if (find) {
                    var result = '';
                    angular.forEach($scope.severity2, function (key, val) {
                        if (find == key.valueName) {
                            //  console.log('=====');
                            //  console.log(key.name + ' ' + key.valueName);
                            result = key.name;
                        }
                    })
                    return result
                }
            }
            ;


      //  $scope.checkedSeverity = [];
        /*$scope.toggleCheck = function (fruit) {
            if ($scope.checkedFruits.indexOf(fruit) === -1) {
                $scope.checkedFruits.push(fruit);
            } else {
                $scope.checkedFruits.splice($scope.checkedFruits.indexOf(fruit), 1);
            }
            ;
        };*/

        $scope.$watch('severity', function (newVal, oldVal) {
            var checkBoxList = [];
            angular.forEach($scope.severity, function (val, kay) {
                if (val === true) {
                    checkBoxList.push(searchKey(kay));
                }
                ;
            });
           // console.log(checkBoxList.length);
            if (checkBoxList.length > 0) {
               // console.log('///');
               // console.log(checkBoxList);
                if (checkBoxList.indexOf('None Apply') > -1) {
                   // console.log('one');
                    checkBoxList = ['None Apply'];
                    writeChanges('Incident Severity (Check all that Apply)', checkBoxList, true)
                } else {
               //     console.log('ok');
                    writeChanges('Incident Severity (Check all that Apply)', checkBoxList, true)
                }
            } else {
              //  console.log('err');
                   writeChanges('Incident Severity (Check all that Apply)', [], false)
            }
        }, true);


// $scope.$watch('reporterName', function () {


//  console.log($scope.generalForm.reporterName1.$valid);
//console.log($scope.generalForm.reporterName.$pristine);
//   console.log($scope.generalForm.reporterName.$error.required);
//  console.log($scope.generalForm.reporterName.$error);

//  });

        /*  onsole.log($scope.generalForm.$valid = true
         onsole.log($scope.generalForm.$error.required = false
         onsole.log($scope.generalForm.$error.minlength = false
         onsole.log($scope.generalForm.$error.maxlength = false*/


        /*  var fields = [
         {"name": "Date and Time of Incident", "values": $scope.reporterName},
         {"name": "Reported By", "values": $scope.data.dateDropDownWithInput},
         {"name": "Company of Reporter", "values": ["CompanyA"]},
         {"name": "Contact Number", "values": ["405.234.9751"]},
         {"name": "Supervisor Name", "values": ["Aaron Moore"]},
         {"name": "High Level Description of Incident", "values": ["description"]},
         {"name": "Well Number", "values": ["Well-01"]},
         {"name": "Region", "values": ["South"]},
         {"name": "State", "values": ["Oklahoma"]},
         {"name": "Field Office", "values": ["Ringwood"]},
         {
         "name": "Incident Severity (Check all that Apply)",
         "values": ["Loss of well control", "Spill offsite > 50 Bbls"]
         }]*/

    }
)
;