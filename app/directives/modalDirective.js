/**
 * @ngdoc directive
 * @name app:modalDirective
 *
 * @description
 *
 *
 * @restrict A
 * */
angular.module('myApp')
    .directive('modalDirective', function () {
        return {
            restrict: 'A',
            link: function (scope, elem, attr) {
                scope.dismiss = function () {
                    elem.modal('hide');
                  //  console.log('modalDirective dismiss')
                }
            }
        }
    });
