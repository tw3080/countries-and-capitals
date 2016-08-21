describe('getCountryInfo', function() {
    beforeEach(module('countriesLibrary'));
    it('should query the geonames API and return a list of countries', inject(function(getCountryInfo, $rootScope, $httpBackend) {
        $httpBackend.expectGET('//api.geonames.org/countryInfo?type=json&username=tw3080').respond(200);
        getCountryInfo().then(function(response) {
            $rootScope.data = response;
            expect($rootScope.data.length).toBeGreaterThan(0);
            expect($rootScope.data.length).toEqual(250);
        });
    }));
});
