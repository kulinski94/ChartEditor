// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

         .when('/candles', {
            templateUrl: 'views/candles.html',
            controller: 'NerdController'
        });

    $locationProvider.html5Mode(true);

}]);