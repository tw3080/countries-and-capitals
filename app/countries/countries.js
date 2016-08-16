viewsModule.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/countries', {
        templateUrl: 'countries/countries.html',
        controller: 'CountriesCtrl'
    });
}]);

viewsModule.controller('CountriesCtrl', function($scope, getCountryInfo) {
    getCountryInfo().then(function(response) {
        $scope.data = response;
    });

    $scope.goToCountry = function(code) {
        window.location.href = '#/countries/' + code;
    };
});
