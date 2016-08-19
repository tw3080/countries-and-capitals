describe('countriesAppViews', function() {
    beforeEach(module('countriesAppViews'));

    describe('/countries/:countryCode route', function() {
        it('should load the template and the controller', inject(function($location, $httpBackend, $rootScope, $route) {
            $httpBackend.whenGET('country-detail/country-detail.html').respond('...');
            $httpBackend.expectGET('//api.geonames.org/countryInfo?type=json&username=tw3080').respond({});

            $rootScope.$apply(function() {
                $location.path('/countries/:CountryCode');
            });
            expect($route.current.loadedTemplateUrl).toBe('country-detail/country-detail.html');
            expect($route.current.controller).toBe('CountryDetailCtrl');
        }));
    });

    describe('CountryDetailCtrl', function() {
        beforeEach(inject(function($rootScope, $controller, _$location_) {
            scope = $rootScope.$new();
            ctrl = $controller('CountriesCtrl', {
                $scope: scope
            });
            $location = _$location_;
        }));

        it('should go to the selected neighbor', inject(function($httpBackend, $rootScope) {
            $httpBackend.whenGET('country-detail/country-detail.html').respond('...');
            $httpBackend.expectGET('//api.geonames.org/countryInfo?type=json&username=tw3080').respond({});
            scope.goToCountry('CA');
            expect($location.path()).toBe('/countries/CA');
        }));
    });
});
