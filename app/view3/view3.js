'use strict';

angular.module('myApp')
    .controller('ReviewCtrl', function ($scope, $rootScope, $filter, $window, $location, formDataFactory) {

        $rootScope.reviewTab = 'active';
        $scope.generalInfo = $scope.formData.fieldsDataS.getList();
        $scope.correctiveActions = $scope.formData.sendDataS.correctiveActionList(false);
        $scope.submitBtn = function () {
            $scope.formData.sendData($scope.formData.sendDataS.prepareSendObj());
        };
        $scope.submitEnable = function () {
            $scope.formValid = false;
            var tableLimit = $scope.formData.settingsFormDataS.get().fields[3].tableLimit;
            var actionList = $scope.formData.actionListDataS.get();
            var fields = $scope.formData.fieldsDataS.getList();
            var fieldsValid = true;
            angular.forEach(fields, function (val, key) {
                if (!val.info) {
                    fieldsValid = false;
                }
            });
            if (actionList.length <= tableLimit && actionList.length >= 1 && fieldsValid) {
                $scope.formValid = true;
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