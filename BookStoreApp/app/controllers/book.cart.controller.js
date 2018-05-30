/**
 * 
 */
var bkcController = angular.module("bookStoreApp.bookCartController", []);

bkcController.controller("bookCartController", ["$scope", "$window", "$location",
  function ($scope, $window, $location) {

    $scope.message = false;
    $scope.totalAmount = 0;
    $scope.populate = populate;
    $scope.removeBook = removeBook;
    $scope.goToIndex = goToIndex;
    $scope.goToBook = goToBook;
    $scope.countUp = countUp;
    $scope.countDown = countDown;

    //populate cart items if available in cart
    function populate() {
      $scope.message = false;
      $scope.cart = [];
      if ($window.sessionStorage.getItem("cart") != undefined) {
        $scope.cart = angular.fromJson($window.sessionStorage.getItem("cart"));
      }
      if ($scope.cart.length == 0) {
        $scope.message = true;
      }
      $scope.changeMainCart($scope.cart);
      total();
    };

    function total() {
      $scope.totalAmount = 0;
      angular.forEach($scope.cart, function (value, key) {
        $scope.totalAmount += value.Price * value.count;
      });
      $scope.totalAmount.toFixed(2);
    }

    function removeBook(id) {
      angular.forEach($scope.cart, function (value, key) {
        if (value.BookId == id) {
          $scope.cart.splice(key, 1);
        }
      });
      total();
      if ($scope.cart.length == 0) {
        $scope.message = true;
      }
      $window.sessionStorage.setItem("cart", angular.toJson($scope.cart));
      $scope.changeMainCart($scope.cart);
    }

    function countUp(book) {
      book.count++;
      $window.sessionStorage.setItem('cart', angular.toJson($scope.cart));
      total();
    }

    function countDown(book) {
      book.count--;
      $window.sessionStorage.setItem('cart', angular.toJson($scope.cart));
      total();
    }

    function goToIndex() {
      $location.url("/");
    }

    function goToBook(id) {
      id = parseInt(id);
      $location.url("/detail/" + id);
    }
  }
]);