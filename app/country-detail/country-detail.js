viewsModule.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/countries/:countryCode', {
        templateUrl: 'country-detail/country-detail.html',
        controller: 'CountryDetailCtrl'
    });
}]);

viewsModule.controller('CountryDetailCtrl', function($scope, $routeParams, getCountryInfo, $filter, countrySearch, neighborSearch) {
    $scope.isLoading = true; // When isLoading is true, the div containing the country details is hidden
    $scope.countryCode = $routeParams.countryCode;

    /* Get country info from HTTP request */
    getCountryInfo().then(function(response) {
        /* Filter countries by country code */
        var country = $filter('getByCountryCode')(response, $scope.countryCode);
        $scope.countryData = country;
        /* Return a specific country based on its capital from the array of filtered countries */
        return countrySearch(country.capital);
    }).then(function(response) {
        $scope.capitalData = response[0];
        /* Return array of neighbors based on a country's code */
        return neighborSearch($scope.capitalData.countryCode);
    }).then(function(response) {
        $scope.isLoading = false; // When isLoading is false, the div containing the country details is visible
        $scope.neighbors = response;
    });

    $scope.goToNeighbor = function(code) {
        /* Change route based on which neighboring country the user selects */
        window.location.href = '#/countries/' + code;
    };
});
