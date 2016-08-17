angular.module('countriesLibrary', [])
/* Setting constants */
.constant('GEONAMES_API_PREFIX', 'http://api.geonames.org')
.constant('GEONAMES_TYPE', 'json')
.constant('GEONAMES_USERNAME', 'tw3080')
// TODO: Promises stuff? $q
/* Returns information about each country in the world, such as name, population, area, etc. */
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
}])
/* Takes a country's capital as a parameter and then returns information about that capital, such as name and population */
.factory('countrySearch', ['$http', '$q', 'GEONAMES_API_PREFIX', 'GEONAMES_TYPE', 'GEONAMES_USERNAME', function($http, $q, GEONAMES_API_PREFIX, GEONAMES_TYPE, GEONAMES_USERNAME) {
    return function(capital) {
        var params = {
            username: GEONAMES_USERNAME,
            type: GEONAMES_TYPE,
            q: capital,
            name_equals: capital,
            isNameRequired: true
        };
        return $http({
            method: 'GET',
            url: GEONAMES_API_PREFIX + '/search',
            cache: true,
            params: params
        })
        .then(function(response) {
            return response.data.geonames;
        });
    };
}])
/* Gets a country's neighboring countries based on country code */
.factory('neighborSearch', ['$http', '$q', 'GEONAMES_API_PREFIX', 'GEONAMES_TYPE', 'GEONAMES_USERNAME', function($http, $q, GEONAMES_API_PREFIX, GEONAMES_TYPE, GEONAMES_USERNAME) {
    return function(countryCode) {
        var params = {
            username: GEONAMES_USERNAME,
            type: GEONAMES_TYPE,
            country: countryCode
        };
        return $http({
            method: 'GET',
            url: GEONAMES_API_PREFIX + '/neighbours',
            cache: true,
            params: params
        })
        .then(function(response) {
            // console.log(response.data.geonames);
            return response.data.geonames;
        });
    };
}])
/* Filters a list of countries based on country code if the code for the country which the user clicks on is equal to a code in the array of countries returned by getCountryInfo */
.filter('getByCountryCode', function() {
    return function(list, code) {
        var country = list.filter(function(country) {
            // console.log(country, code);
            if (country.countryCode == code) {
                return true;
            }
        });
        if (country) {
            return country[0];
        }
    };
});
