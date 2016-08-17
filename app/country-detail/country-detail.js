viewsModule.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/countries/:countryCode', {
        templateUrl: 'country-detail/country-detail.html',
        controller: 'CountryDetailCtrl'
    });
}]);

viewsModule.controller('CountryDetailCtrl', function($scope, $routeParams, getCountryInfo, $filter, countrySearch, neighborSearch) {
    $scope.countryCode = $routeParams.countryCode;
    getCountryInfo().then(function(response) {
        // console.log(response);
        var country = $filter('getByCountryCode')(response, $scope.countryCode);
        $scope.countryData = country;
        // console.log(country);
        return countrySearch(country.capital);
    }).then(function(response) {
        console.log(response[0]);
        $scope.capitalData = response[0];
        // $scope.capital = $scope.capitalData;
        return neighborSearch($scope.capitalData.countryCode);
    }).then(function(response) {
        // console.log(response);
        $scope.neighbors = response;
        console.log($scope.neighbors);
    });

    $scope.goToNeighbor = function(code) {
        window.location.href = '#/countries/' + code;
    };
});
