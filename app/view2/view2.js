'use strict';

angular.module('myApp')
    .controller('CorrectiveCtrl',
    function ($scope, $rootScope, $log, $filter, formDataFactory) {
        'use strict';
        $scope.formData = formDataFactory;
        $rootScope.actionTab = 'active';
        $scope.actionList = [];
        var itemAction = {};
        var tableLimit = $scope.formData.settingsFormDataS.get().fields[3].tableLimit;
        $scope.update = function () {
            $scope.actionList = $scope.formData.actionListDataS.get();
            $scope.$watch('actionList', function () {
                if (!$scope.actionList.length) {
                    $scope.emptyList = true;
                } else {
                    $scope.emptyList = false;
                }

                if ($scope.actionList.length >= tableLimit) {
                    $scope.tableLimit = true;
                } else {
                    $scope.tableLimit = false;
                }
            });
            $scope.actionList = $scope.formData.actionListDataS.get();
        };

        $scope.update();
        $scope.removeRow = function (idx) {
            $scope.formData.actionListDataS.remove(idx);
            $scope.update();
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
        };
        $scope.edit = function () {
            if (itemIdxEditMode !== undefined) {
                $scope.modalApply(itemIdxEditMode)
                $scope.dismiss();
            }
            ;
        };
        $scope.addRow = function () {
            $scope.EditMode = false;
            $scope.modalActionDate = new Date();
            var formFields = $scope.formData.settingsFormDataS.get();
            $scope.company = formFields.fields[0].CompanyOfReporter;
            $scope.$watch('modalActionDescription', function () {
                itemAction.description = $scope.modalActionDescription;
            });
            $scope.$watch('modalActionName', function () {
                itemAction.name = $scope.modalActionName;
            });
            $scope.$watch('modalActionCompany', function () {
                itemAction.company = $scope.modalActionCompany;
            });
            $scope.$watch('modalActionDate', function () {
                itemAction.date = $scope.modalActionDate;
            });
        };
        $scope.close = function () {
            $scope.dismiss();
            $scope.modalApply();
        };
        $scope.modalApply = function (idx) {
            itemAction.description = $scope.modalActionDescription;
            itemAction.name = $scope.modalActionName;
            itemAction.company = $scope.modalActionCompany;
            itemAction.date = $scope.modalActionDate;
            $scope.EditMode ? $scope.formData.actionListDataS.edit(idx, itemAction) : $scope.formData.actionListDataS.set(itemAction);
            $scope.update();
            itemAction = {};
            $scope.modalActionDescription = '';
            $scope.modalActionName = '';
            $scope.modalActionCompany = '';
            $scope.modalActionDate = new Date();
        };
        $scope.formattedDate = $filter('date')(new Date(), 'dd/MM/yyyy HH:mm a');
    }
);