'use strict';

angular.module('myApp', [
    'ngRoute',
    'ui.bootstrap.datetimepicker',
    'myApp.version'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/view1', {
                templateUrl: 'view1/view1.html',
                controller: 'GeneralCtrl'
            }).
            when('/view2', {
                templateUrl: 'view2/view2.html',
                controller: 'CorrectiveCtrl'
            }).
            when('/view3', {
                templateUrl: 'view3/view3.html',
                controller: 'ReviewCtrl'
            }).
            when('/view4', {
                templateUrl: 'view4/view4.html',
                controller: 'newTabCtrl'
            }).
            otherwise({
                redirectTo: '/view1'
            });
    }])

