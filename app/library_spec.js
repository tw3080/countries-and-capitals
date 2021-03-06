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

describe('countrySearch', function() {
    beforeEach(module('countriesLibrary'));
    it('should query the geonames API and return information about a country', inject(function(countrySearch, $rootScope, $httpBackend) {
        $httpBackend.expectGET('//api.geonames.org/search?isNameRequired=true&name_equals=Abu+Dhabi&q=Abu+Dhabi&type=json&username=tw3080').respond(200);
        countrySearch().then(function(response) {
            $rootScope.data = response;
            expect($rootScope.data.length).toBeGreaterThan(0);
            expect($rootScope.data.geonames[0].countryCode).toBe('AE');
            expect($rootScope.data.geonames[0].toponymName).toBe('Abu Dhabi');
        });
    }));
});

describe('neighborSearch', function() {
    beforeEach(module('countriesLibrary'));
    it('should query the geonames API and return a list of neighboring countries', inject(function(neighborSearch, $rootScope, $httpBackend) {
        $httpBackend.expectGET('//api.geonames.org/neighbours?country=AE&type=json&username=tw3080').respond(200);
        neighborSearch().then(function(response) {
            $rootScope.data = response;
            expect($rootScope.data.length).toBeGreaterThan(0);
            expect($rootScope.data.geonames[0].countryCode).toBe('OM');
            expect($rootScope.data.geonames[1].countryCode).toBe('SA');
        });
    }));
});

describe('getByCountryCode filter', function() {
    beforeEach(module('countriesLibrary'));
    it('should filter a list of countries based on a country code', inject(function(getByCountryCodeFilter, getCountryInfo, $rootScope, $httpBackend) {
        $httpBackend.expectGET('//api.geonames.org/countryInfo?type=json&username=tw3080').respond(200);
        getCountryInfo().then(function(response) {
            $rootScope.data = response;
            var country = getByCountryCodeFilter($rootScope.data, 'AE');
            expect(country.countryCode).toBe('AE');
        });
    }));
});
