viewsModule.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/countries/:countryCode', {
        templateUrl: 'country-detail/country-detail.html',
        controller: 'CountryDetailCtrl'
    });
}]);

viewsModule.controller('CountryDetailCtrl', function($scope, $routeParams, countrySearch) {
    $scope.countryCode = $routeParams.countryCode;
    countrySearch().then(function(response) {
        $scope.selectedCountry = response[$scope.countryCode];
    });
});
