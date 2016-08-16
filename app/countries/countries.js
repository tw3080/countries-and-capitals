viewsModule.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/countries', {
        templateUrl: 'countries/countries.html'
    });
}]);
