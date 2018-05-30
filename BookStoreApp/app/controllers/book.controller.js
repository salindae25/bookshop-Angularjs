var bkController = angular.module("bookStoreApp.bookController", [
    'bookStoreApp.bookListController',
    'bookStoreApp.bookAddController',
    'bookStoreApp.bookDetailController',
    'bookStoreApp.bookEditController',
    'bookStoreApp.bookCartController'
    //,
    //'bookStoreApp.bookMainController'
]);

bkController.controller('mainController', ['$scope', '$window', '$location', function ($scope, $window, $location) {

    $scope.goCart = function () {
        $scope.mainCart = [];
        if ($window.sessionStorage.getItem('cart') != undefined) {
               $scope.mainCart = angular.fromJson($window.sessionStorage.getItem('cart'));
        }
    };
    $scope.changeMainCart =function (value) {
        $scope.mainCart=value;
    }
    $scope.goToCart = function () {
        $location.url('/cart')
    }

}]);