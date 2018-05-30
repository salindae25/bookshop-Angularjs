/**
 * 
 */
var bkEditController = angular.module("bookStoreApp.bookEditController", []);

bkEditController.controller("bookEditController", [
    '$scope', 'apiService', '$location', '$routeParams', 'existService',
    function ($scope, apiService, $location, $routeParams, existService) {


        var bklist = [];
        var author = [];
        var originalBook = [];
        var tempId = 0;
        $scope.genres = [];
        $scope.item = {};
        $scope.populate = populate;
        $scope.editBook = editBook;
        $scope.deleteBook= deleteBook;
        $scope.resetForm = resetForm;
        $scope.imageUpload = imageUpload;
        $scope.goToIndex = goToIndex;
        $scope.goToBook = goToBook;

        //Populate option on author and genre
        function populate() {
            tempId = parseInt($routeParams.id);
            apiService.genre.query().$promise.then(function (res) {
                $scope.genres = res;
            });
            apiService.author.query().$promise.then(function (result) {
                author = result;
            });
            apiService.book.get({
                id: tempId
            }, function (res) {
                $scope.item = {
                    BookName: res.Name,
                    Price: res.Price,
                    BookId: res.Id,
                    Description: res.Description,
                    ImgUrl: res.ImgUrl
                };
                tempId = parseInt(res.AuthorId);
                apiService.author.get({
                    id: tempId
                }).$promise.then(function (result) {
                    $scope.item.AuthorName = result.Name;
                });
                $scope.item.GenreId = res.GenreId;
                originalBook = angular.copy($scope.item);
            });

        }

        function authorExist(name) {
            var authorid = -1;
            for (var i = 0; i < author.length; i++) {
                if (name == author[i].Name) {
                    authorid = author[i].Id;
                }
            }
            if (authorid == -1) {
                authorid = author.length;
                apiService.author.save({
                    id: authorid
                }, {
                    'Id': authorid,
                    'Name': name
                });
            }
            return authorid;
        }
        // create book entry via api
        function editBook(item) {
            var send = {
                Name: item.BookName,
                Id: item.BookId,
                Price: item.Price,
                GenreId: item.GenreId,
                Description: item.Description,
            };
            send.AuthorId = authorExist(item.AuthorName);
            send.Id = parseInt(send.Id);
            apiService.book.update({
                id: send.Id
            }, send).$promise.then(
                function (respond) {
                
            },function (respond) {
                
            });
            $scope.goToIndex();
        }

        function resetForm() {
            $scope.item = angular.copy(originalBook);
        }
        function deleteBook(item) {
            var id=parseInt(item.BookId);
            apiService.book.remove({id:id}).$promise.then(function (resp) {
                alert('Delete successfully');
            },function (resp) {
                alert('unsuccessful!!');
            });
        }

        function imageUpload() {
            console.log("change");
        }

        function goToIndex() {
            $location.url('/');
        }

        function goToBook(id) {
            id = parseInt(id);
            $location.url('/detail/' + id);
        }

    }
]);