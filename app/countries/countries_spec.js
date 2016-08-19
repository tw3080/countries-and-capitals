describe('countriesAppViews', function() {
    beforeEach(module('countriesAppViews'));

    describe('/countries route', function() {
        it('should load the template', inject(function($location, $httpBackend, $rootScope, $route) {
            $httpBackend.whenGET('countries/countries.html').respond('...');
            $httpBackend.expectGET('//api.geonames.org/countryInfo?type=json&username=tw3080').respond({});
            $rootScope.$apply(function() {
                $location.path('/countries');
            });
            expect($route.current.loadedTemplateUrl).toBe('countries/countries.html');
        }));

        beforeEach(inject(function($controller, $rootScope, _$location_) {
            scope = $rootScope.$new();
            ctrl = $controller('CountriesCtrl', {
                $scope: scope
            });
            $location = _$location_;
        }));

        it('should go to the selected country', inject(function($httpBackend, $rootScope) {
            $httpBackend.whenGET('countries/countries.html').respond('...');
            $httpBackend.expectGET('//api.geonames.org/countryInfo?type=json&username=tw3080').respond({});
            scope.goToCountry('USA');
            expect($location.path()).toBe('/countries/USA');
        }));
    });
});
