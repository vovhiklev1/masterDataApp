angular.module('myApp')
    .controller('appCtrl', function ($scope, $location, $rootScope, $routeParams, formDataFactory) {
        $scope.formData = formDataFactory;
        //  $scope.formData.loadList('https://api.myjson.com/bins/4lvyf').then(function (response) {
        //    $scope.formData.settingsFormDataS.set(response.data);
        // });

        var formSettings = '[{"fields":[{"CompanyOfReporter":[{"name":"CompanyA"},{"name":"CompanyB"},{"name":"CompanyC"},{"name":"CompanyD"}]},{"WellNumber":[{"Well-01":[{"Region":"South"},{"State":"Oklahoma"},{"FieldOffice":"Ringwood"}],"Well-02":[{"Region":"North"},{"State":"Montana"},{"FieldOffice":"Sidney"}],"Well-03":[{"Region":"North"},{"State":"North Dakota"},{"FieldOffice":"Tioga"}]}]},{"IncidentSeverity":[{"name":"Loss of well controll","valueName":"value1"},{"name":"Fatality(ies)","valueName":"value2"},{"name":"Hospitalisation or medical threatment","valueName":"value3"},{"name":"Spill offsite \u003e 50Bbls","valueName":"value4"},{"name":"Spill to water, any amount","valueName":"value5"},{"name":"Property damage","valueName":"value6"},{"name":"None Apply","valueName":"enable"}]},{"tableLimit":5}]}]';
        formSettings = JSON.parse(formSettings);
        $scope.formData.settingsFormDataS.set(formSettings[0]);

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
    })
;
