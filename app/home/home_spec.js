describe('countriesAppViews', function() {
    beforeEach(module('countriesAppViews'));

    describe('/ route', function() {
        it('should load the template', inject(function($location, $httpBackend, $rootScope, $route) {
            $httpBackend.whenGET('home/home.html').respond('...');
            $rootScope.$apply(function() {
                $location.path('/');
            });
            expect($route.current.loadedTemplateUrl).toBe('home/home.html');
        }));
    });
});
