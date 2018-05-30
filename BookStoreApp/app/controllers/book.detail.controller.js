/**
 *  controller responsible for view of details of book
 *  populate()  - for populating value of requested book details
 *  addCart()   - for adding item to cart list
 *  goToIndex() - for directing location to main page.
 *  goToCart()  - for directing location to cart page.
 */

var bkdetailController = angular.module(
  "bookStoreApp.bookDetailController",
  []
);

bkdetailController.controller("bookDetailController", [
  "$scope",
  "apiService",
  "$location",
  "$routeParams",
  "$rootScope",
  "$window",
  function($scope, apiService, $location, $routeParams, $rootScope, $window) {
    $scope.cart = [];
    $scope.item = {};
    $scope.cartAdded = false;
    $scope.countFlag = false;

    $scope.populate = populate;
    $scope.addCart = addCart;

    $scope.countUp = countUp;
    $scope.countDown = countDown;

    $scope.goToIndex = goToIndex;
    $scope.edit = goToEdit;
    $scope.goToCart = goToCart;

    function populate() {
      var rId = parseInt($routeParams.id);
      angular.forEach($scope.mainCart, function(value, key) {
        if (value.BookId == rId) $scope.cartAdded = true;
      });
      apiService.book.get(
        {
          id: rId
        },
        function(resBook) {
          $scope.item = {
            BookName: resBook.Name,
            Price: resBook.Price,
            BookId: resBook.Id,
            Description: resBook.Description,
            ImgUrl: resBook.ImgUrl,
            count: 1
          };
          rId = parseInt(resBook.AuthorId);

          apiService.author.get({ id: rId }).$promise.then(function(result) {
            $scope.item.AuthorName = result.Name;
          });
          $scope.item.GenreId = resBook.GenreId;
        }
      );
    }

    function addCart(item) {
      if ($window.sessionStorage.getItem("cart") != undefined) {
        $scope.cart = angular.fromJson($window.sessionStorage.getItem("cart"));
      }
      $scope.cart.push(item);
      $window.sessionStorage.setItem("cart", angular.toJson($scope.cart));

      $scope.cartAdded = true;
      $location.url("/cart");
    }

    function countUp(book) {
      if (book.count < 10) {
        book.count++;
        $scope.countFlag = true;
      } else {
        $scope.countFlag = true;
      }
    }

    function countDown(book) {
      if (book.count > 1) {
        book.count--;
        $scope.countFlag = false;
      } else {
        $scope.countFlag = false;
      }
    }

    function goToEdit(id) {
      id = parseInt(id);
      $location.url("/edit/" + id);
    }

    function goToIndex() {
      $location.url("/");
    }

    function goToCart() {
      $location.url("/cart");
    }
  }
]);
