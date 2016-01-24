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
            /*template:'<tr ng-mouseover="ctrlBtn = true"'+
            'ng-mouseleave="ctrlBtn = false">'+
            '<td>2</td>'+
            '<td>Jacob</td>'+
            '<td>Thornton</td>'+
            '<td>@fat</td>'+
            '<td>'+
            '<div  class="btn-group btn-group-sm" role="group" aria-label="...">'+
            '<button type="button" class="btn btn-default table-action btn-edit"'+
            'ng-model="btnEdit">' +
            '<span class="glyphicon glyphicon-pencil"  aria-hidden="true">' +
            '</span></button>'+
            '<button type="button" class="btn btn-default table-action btn-remove" ng-model="btnRemove" >' +
            '<span     class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>'+
            '</div> </td> </tr>',*/
            link: function (scope, elem, attr) {
                /*elem.replaceWith($compile(
                    '<tr ng-mouseover="ctrlBtn = true"'+
                'ng-mouseleave="ctrlBtn = false">'+
                    '<td>2</td>'+
                    '<td>Jacob</td>'+
                    '<td>Thornton</td>'+
                    '<td>@fat</td>'+
                '<td>'+
                '<div  class="btn-group btn-group-sm" role="group" aria-label="...">'+
                '<button type="button" class="btn btn-default table-action btn-edit"'+
                'ng-model="btnEdit">' +
                '<span class="glyphicon glyphicon-pencil"  aria-hidden="true">' +
                '</span></button>'+
                '<button type="button" class="btn btn-default table-action btn-remove" ng-model="btnRemove" >' +
                    '<span     class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>'+
                '</div> </td> </tr>'
                )(scope));*/


                elem.replaceWith(function () {
                    return $("<h1> hello  <h1/>").append(elem.contents());
                });
            }
        };
    });
