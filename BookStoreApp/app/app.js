/**
 * 
 */
var app = angular.module("bookStoreApp", [
    'ngRoute',
    'ngResource',
    'bookStoreApp.bookController',
    'bookStoreApp.bookServices',
    'bookStoreApp.bookDirectives'
]);

app.config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
        .when('/', {
            templateUrl: "/Partials/BookList",
            controller: "bookListController"
        })
        .when('/detail/:id', {
            templateUrl: "/Partials/BookDetail",
            controller: "bookDetailController"
        })
        .when('/edit/:id', {
            templateUrl: "/Partials/BookEdit",
            controller: "bookEditController"
        })
        .when('/add', {
            templateUrl: "/Partials/BookAdd",
            controller: "bookAddController"
        })
        .when('/cart', {
            templateUrl: '/Partials/BookCart',
            controller: 'bookCartController'
        })
        .otherwise('/');
}]);


