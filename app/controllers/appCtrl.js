angular.module('myApp')
    .controller('appCtrl', function ($scope, $location, $rootScope, $routeParams, formDataFactory) {

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
            $scope.formData.settingsFormDataS.set(response.data); //$scope.f.responseDataS.set(response.data.list, 'mail');
            console.log('form loaded');
        });

        //init
        $scope.formData.fieldsDataS.create("Date and Time of Incident", "");
        $scope.formData.fieldsDataS.create("Reported By", "");
        $scope.formData.fieldsDataS.create("Company of Reporter", "");

        $scope.formData.fieldsDataS.create("Contact Number", "");
        $scope.formData.fieldsDataS.create("Supervisor Name", "");
        $scope.formData.fieldsDataS.create("High Level Description of Incident", "");
        $scope.formData.fieldsDataS.create("Well Number", "");

        $scope.formData.fieldsDataS.create("Region", "");
        $scope.formData.fieldsDataS.create("State", "");
        $scope.formData.fieldsDataS.create("Field Office", "");
        $scope.formData.fieldsDataS.create("Incident Severity (Check all that Apply)", "");

    });
