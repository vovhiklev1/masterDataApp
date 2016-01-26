'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
   /* 'myApp.view1',
    'myApp.view2',
    'myApp.view3',*/
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
    }]);


/*
$(".btn").mouseup(function(){
    $(this).blur();
    console.log('blur')
})*/
