describe('countriesAppViews', function() {
    beforeEach(module('countriesAppViews'));

    describe('/countries/:countryCode route', function() {
        it('should load the template', inject(function($location, $httpBackend, $rootScope, $route) {
            $httpBackend.whenGET('country-detail/country-detail.html').respond('...');
            $rootScope.$apply(function() {
                $location.path('/countries/:CountryCode');
            });
            expect($route.current.loadedTemplateUrl).toBe('country-detail/country-detail.html');
        }));
    });
});
