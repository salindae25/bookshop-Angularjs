/**
 * 
 */
var bklistController = angular.module("bookStoreApp.bookListController", [])

bklistController.controller("bookListController", [
    '$scope', 'apiService', '$location',
    function ($scope, apiService, $location) {
        $scope.books = [];
        $scope.bookOrders = ['BookName', 'BookType', 'BookId'];
        $scope.genre = [];
        $scope.pages = [];
        $scope.pageBegin = 0;

        var defaultBook = {
            ImgUrl: '/Content/img/default.png'
        };

        $scope.goToDetail = goToDetail;
        $scope.getBookList = getBookList;
        $scope.setPage = setPage;
        $scope.goToAdd = goToAdd;

        function getBookList() {
            apiService.genre.query(function (result) {
                $scope.genre = result;
            });
            apiService.book.query(function (res) {
                angular.forEach(res, function (value, key) {
                    var book = {
                        BookName: value.Name,
                        Price: value.Price,
                        BookId: value.Id,
                        type: value.GenreId,
                        Description: value.Description,
                        ImgUrl: (value.ImgUrl) ? value.ImgUrl : defaultBook.ImgUrl
                    };
                    $scope.books.push(book);
                });
                pagination();
                $scope.pageBegin = 0;
            });

        }

        function setPage(page) {
            $scope.pageBegin = page;
        }

        function goToAdd() {
            $location.url('/add');
        }

        function goToDetail(id) {
            id = parseInt(id);
            $location.url('/detail/' + id);
        }

        function pagination() {
            var noOfPages = $scope.books.length / 8;
            noOfPages = Math.ceil(noOfPages);
            for (var i = 0; i < noOfPages; i++) {
                $scope.pages.push(i * 8);
            }
        }

    }
]);