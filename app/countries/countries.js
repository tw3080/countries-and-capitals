viewsModule.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/countries', {
        templateUrl: 'countries/countries.html',
        controller: 'CountriesCtrl'
    });
}]);

viewsModule.controller('CountriesCtrl', function($scope, getCountryInfo) {
    $scope.isLoading = true; // When isLoading is true, a loading message will display
    /* Get country info from HTTP request */
    getCountryInfo().then(function(response) {
        $scope.isLoading = false; // When isLoading is false, the loading message is hidden and the table with country data displays
        $scope.data = response;
    });

    /* Changes route based on which country the user clicks */
    $scope.goToCountry = function(code) {
        window.location.href = '#/countries/' + code;
    };
});
