viewsModule.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/countries/:countryCode', {
        templateUrl: 'country-detail/country-detail.html',
        controller: 'CountryDetailCtrl'
    });
}]);

viewsModule.controller('CountryDetailCtrl', function($scope, $routeParams, countrySearch) {
    $scope.countryCode = $routeParams.countryCode;
    countrySearch().then(function(response) {
        console.log(response);
    });

    $scope.goToCountry = function() {
        console.log('lol');
        /*
        window.location.href = '#/countries/' + code;
        console.log(window.location.href);
        */
    };
});
