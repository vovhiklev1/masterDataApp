'use strict';

angular.module('myApp')

/*.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])*/

.controller('ReviewCtrl', function($scope,$rootScope, formDataFactory) {
/*      $scope.tabData = formDataFactory.navTabs;
      $scope.activeTab = $scope.tabData.setActiveTab('reviewTab');
      $rootScope.activeTab = $scope.tabData.getActiveTab('reviewTab');*/
      $rootScope.reviewTab ='active';
      console.log('v3');
});