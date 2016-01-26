'use strict';

angular.module('myApp').controller('GeneralCtrl',
    function ($scope, $rootScope, $log, $filter, formDataFactory) {
        'use strict';
        $rootScope.generalTab = 'active';
        $scope.formData = formDataFactory;
        $scope.updateView = function () {
            var formFields = $scope.formData.settingsFormDataS.get();
            $scope.company = formFields.fields[0].CompanyOfReporter;
            var wellNumber = formFields.fields[1].WellNumber[0];
            $scope.wellNumberKeys = Object.keys(wellNumber);
            $scope.wellNumberSelected = $scope.wellNumberKeys[0];
            $scope.$watch('wellNumberSelected', function () {
                var selected = $scope.wellNumberSelected;
                if (selected) {
                    $scope.region = wellNumber[selected][0].Region;
                    $scope.state = wellNumber[selected][1].State;
                    $scope.fieldOffice = wellNumber[selected][2].FieldOffice;
                }
            });
        };
        $scope.updateView();


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
        });
        var writeChanges = function (name, value, info) {
            $scope.formData.fieldsDataS.setData(name, value, info);
        };

        $scope.$watch('incidentDate', function () {
            if (
                $scope.datePickerWithInputForm.formDateValue.$error.required !== true && !$scope.datePickerWithInputForm.formDateValue.$invalid
            ) {
                writeChanges('Date and Time of Incident', $scope.incidentDate, true)
            } else {
                writeChanges('Date and Time of Incident', $scope.incidentDate, false)
            }
            $scope.incidentDate = $scope.formData.fieldsDataS.getData('Date and Time of Incident');
        });
        $scope.reporterName = $scope.formData.fieldsDataS.getData('Reported By');
        $scope.$watch('reporterName', function () {
            if ($scope.generalForm.name.$error.required !== true &&
                ($scope.generalForm.name.$dirty || $scope.reporterName.length ) &&
                $scope.generalForm.name.$invalid !== undefined
            ) {
                writeChanges('Reported By', $scope.reporterName, true)
            } else {
                writeChanges('Reported By', $scope.reporterName, false)
            }
            ;
        });
        $scope.reporterCompany = $scope.formData.fieldsDataS.getData('Company of Reporter');
        $scope.$watch('reporterCompany', function () {
            if ($scope.generalForm.company.$error.required !== true &&
                ($scope.generalForm.company.$dirty || $scope.reporterCompany.length ) &&
                $scope.generalForm.company.$invalid !== undefined
            ) {
                writeChanges('Company of Reporter', $scope.reporterCompany, true)
            } else {
                writeChanges('Company of Reporter', $scope.reporterCompany, false)
            }
            ;
        });
        $scope.reporterNumber = $scope.formData.fieldsDataS.getData('Contact Number');
        $scope.$watch('reporterNumber', function () {
            // var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@example\.com$/i;
            var EMAIL_REGEXP = /^\(?(\d{3})\)?[.-](\d{3})[.-](\d{4})$/;
            if (
                EMAIL_REGEXP.test($scope.reporterNumber)
            ) {
                writeChanges('Contact Number', $scope.reporterNumber, true)
            } else {
                writeChanges('Contact Number', $scope.reporterNumber, false)
            }
            ;
        });
        $scope.reporterSupervisor = $scope.formData.fieldsDataS.getData('Supervisor Name');
        $scope.$watch('reporterSupervisor', function () {
            writeChanges('Supervisor Name', $scope.reporterSupervisor, true)
        });

        $scope.reporterDescription = $scope.formData.fieldsDataS.getData('High Level Description of Incident');
        $scope.$watch('reporterDescription', function () {
            if ($scope.generalForm.description.$error.required !== true &&
                ($scope.generalForm.description.$dirty || $scope.reporterDescription.length ) &&
                $scope.generalForm.description.$invalid !== undefined
            ) {
                writeChanges('High Level Description of Incident', $scope.reporterDescription, true)
            } else {
                writeChanges('High Level Description of Incident', $scope.reporterDescription, false)
            }
            ;
        });
        $scope.wellNumberSelected = $scope.formData.fieldsDataS.getData('Well Number');
        $scope.$watch('wellNumberSelected', function () {
            writeChanges('Well Number', $scope.wellNumberSelected, true)
        });
        $scope.$watch('region', function () {
            writeChanges('Region', $scope.region, true);
        });
        $scope.$watch('state', function () {
            writeChanges('State', $scope.state, true);
        });
        $scope.$watch('fieldOffice', function () {
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
                            result = key.name;
                        }
                    });
                    return result
                }
            }
            ;
        var searchKey2 = function (find) {
                if (find) {
                    var result = '';
                    angular.forEach($scope.severity2, function (key, val) {
                        if (find == key.name) {
                            $scope.severity[key.valueName] = true;
                        }
                    });
                }
            }
            ;
        var setSeverity = function () {
            $scope.severity3 = $scope.formData.fieldsDataS.getData('Incident Severity (Check all that Apply)');
            angular.forEach($scope.severity3, function (val, key) {
                searchKey2(val);
            })
        };
        setSeverity();
        $scope.$watch('severity', function (newVal, oldVal) {
            var checkBoxList = [];
            angular.forEach($scope.severity, function (val, kay) {
                if (val === true) {
                    checkBoxList.push(searchKey(kay));
                }
                ;
            });
            if (checkBoxList.length > 0) {
                if (checkBoxList.indexOf('None Apply') > -1) {
                    checkBoxList = ['None Apply'];
                    writeChanges('Incident Severity (Check all that Apply)', checkBoxList, true)
                } else {
                    writeChanges('Incident Severity (Check all that Apply)', checkBoxList, true)
                }
            } else {
                writeChanges('Incident Severity (Check all that Apply)', [], false)
            }
        }, true);
    }
)
;