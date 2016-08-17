viewsModule.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/countries/:countryCode', {
        templateUrl: 'country-detail/country-detail.html',
        controller: 'CountryDetailCtrl'
    });
}]);

viewsModule.controller('CountryDetailCtrl', function($scope, $routeParams, getCountryInfo, $filter, countrySearch, neighborSearch) {
    $scope.countryCode = $routeParams.countryCode;
    getCountryInfo().then(function(response) {
        var country = $filter('getByCountryCode')(response, $scope.countryCode);
        $scope.countryData = country;
        return countrySearch(country.capital);
    }).then(function(response) {
        $scope.capitalData = response[0];
        return neighborSearch($scope.capitalData.countryCode);
    }).then(function(response) {
        $scope.neighbors = response;
    });

    $scope.goToNeighbor = function(code) {
        window.location.href = '#/countries/' + code;
    };
});
