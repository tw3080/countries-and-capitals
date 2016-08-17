viewsModule.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/countries', {
        templateUrl: 'countries/countries.html',
        controller: 'CountriesCtrl'
    });
}]);

viewsModule.controller('CountriesCtrl', function($scope, getCountryInfo) {
    /* Get country info from HTTP request */
    getCountryInfo().then(function(response) {
        $scope.data = response;
    });

    /* Changes route based on which country the user clicks */
    $scope.goToCountry = function(code) {
        window.location.href = '#/countries/' + code;
    };
});
