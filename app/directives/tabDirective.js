/**
 * @ngdoc directive
 * @name app:tabDirective
 *
 * @description
 *
 *
 * @restrict A
 * */
angular.module('myApp')
    .directive('tabDirective', function () {
        return {
            restrict: 'AE',
            scope: false,
            controller: 'tabCtrl',
            link: function (scope, elem, attr) {
            }
        };
});
