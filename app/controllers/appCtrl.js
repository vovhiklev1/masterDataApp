angular.module('myApp')
    .controller('appCtrl', function ($scope,$location,$rootScope,  $routeParams, formDataFactory) {

        console.log('appCtrl');
       // $rootScope.generalTab= $rootScope.activeTab;
      //  $scope.tabData = formDataFactory.navTabs;
       // $scope.tabData.setActiveTab('generalTab');
        //$rootScope.activeTab=  $scope.tabData.getActiveTab('generalTab');
      //  var page = $location.url();
       // var pageId = page.slice(1,-1)
      //  console.log($rootScope.activeTab +' $rootScope activeTab ' );
       /// $scope.gg = 'hi';


        $scope.formData = formDataFactory;
        $scope.formData.loadList('./settingsForm.json').then(function (response) {
            $scope.formData.responseDataS.set(response.data); //$scope.f.responseDataS.set(response.data.list, 'mail');
            console.log('form loaded');
        });

    });
