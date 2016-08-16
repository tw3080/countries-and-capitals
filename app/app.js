angular.module('countriesApp', ['countriesAppViews', 'ngRoute'])
    .config(function($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    });
