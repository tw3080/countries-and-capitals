viewsModule.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/countries/:countryCode', {
        templateUrl: 'country-detail/country-detail.html',
        controller: 'CountryDetailCtrl'
    });
}]);

viewsModule.controller('CountryDetailCtrl', function($scope, $routeParams, countrySearch, getCountryInfo, $filter) {
    $scope.countryCode = $routeParams.countryCode;
    getCountryInfo().then(function(response) {
        // console.log(response);
        var country = $filter('getByCountryCode')(response, $scope.countryCode);
        // console.log(country);
        return countrySearch(country.capital);
    }).then(function(response) {
        console.log(response[0]);
        $scope.capital = response[0];
        /*
        return neighborhoodSearch($scope.capital.geonameId);
    }).then(function(response) {
        $scope.neighbors = response[0]; */
    });
});
