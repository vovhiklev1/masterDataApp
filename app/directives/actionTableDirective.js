/**
 * @ngdoc directive
 * @name app:actionTableDirective
 *
 * @description
 *
 *
 * @restrict A
 * */
angular.module('myApp')
    .directive('actionTableDirective', function ($compile) {
        return {
            transclude: true,
            restrict: 'AE',
            scope: false,
            link: function (scope, elem, attr) {

            }
        };
    });
