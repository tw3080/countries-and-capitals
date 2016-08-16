angular.module('countriesLibrary', [])
.constant('GEONAMES_API_PREFIX', 'http://api.geonames.org')
.constant('GEONAMES_TYPE', 'json')
.constant('GEONAMES_USERNAME', 'tw3080')
.factory('getCountryInfo', ['$http', '$q', 'GEONAMES_API_PREFIX', 'GEONAMES_TYPE', 'GEONAMES_USERNAME', function($http, $q, GEONAMES_API_PREFIX, GEONAMES_TYPE, GEONAMES_USERNAME) {
    return function() {
        var params = {
            username: GEONAMES_USERNAME,
            type: GEONAMES_TYPE
        };
        return $http({
            method: 'GET',
            url: GEONAMES_API_PREFIX + '/countryInfo',
            cache: true,
            params: params
        })
        .then(function(response) {
            return response.data.geonames;
        });
    };
}]);
