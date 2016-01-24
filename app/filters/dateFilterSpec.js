describe('Filter: Myapp.dateFilter', function () {

    // load the service's module
    beforeEach(module('Myapp'));

    // instantiate service
    var filter;

    //update the injection
    beforeEach(inject(function ($filter) {
        filter = $filter('dateFilter');
    }));

    /**
     * @description
     * Sample test case to check if the service is injected properly
     * */
    it('should be injected and defined', function () {
        expect(filter('filterInput')).toBe('filterInput');
    });
});
