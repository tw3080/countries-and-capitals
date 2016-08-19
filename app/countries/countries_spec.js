describe('countriesAppViews', function() {
    beforeEach(module('countriesAppViews'));

    describe('/countries route', function() {
        it('should load the template and the controller', inject(function($location, $httpBackend, $rootScope, $route) {
            $httpBackend.whenGET('countries/countries.html').respond('...');
            $httpBackend.expectGET('//api.geonames.org/countryInfo?type=json&username=tw3080').respond({});

            $rootScope.$apply(function() {
                $location.path('/countries');
            });
            expect($route.current.loadedTemplateUrl).toBe('countries/countries.html');
            expect($route.current.controller).toBe('CountriesCtrl');
        }));
    });

    describe('CountriesCtrl', function() {
        beforeEach(inject(function($rootScope, $controller, _$location_) {
            scope = $rootScope.$new();
            ctrl = $controller('CountriesCtrl', {
                $scope: scope
            });
            $location = _$location_;
        }));

        it('should go to the selected country', inject(function($httpBackend, $rootScope) {
            $httpBackend.whenGET('countries/countries.html').respond('...');
            $httpBackend.expectGET('//api.geonames.org/countryInfo?type=json&username=tw3080').respond({});
            scope.goToCountry('US');
            expect($location.path()).toBe('/countries/US');
        }));
    });
});
