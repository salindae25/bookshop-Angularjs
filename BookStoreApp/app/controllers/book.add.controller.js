/**
 *  controller resposible for new book entries
 *  populate()  - for popoulating current genre and authors
 *  addBook()   - for formatting and send data to api service
 *  resetForm() - for resetting input fields of form 
 */
var bkaController = angular.module("bookStoreApp.bookAddController", []);

bkaController.controller("bookAddController", ['$scope', 'apiService', '$location', 'fileUpload', 'existService',
    function ($scope, apiService, $location, fileUpload, existService) {

        var bkl = [];
        var authors = [];
        $scope.genres = [];
        
        $scope.populate = populate;
        $scope.addBook = addBook;
        $scope.goToIndex = goToIndex;
        $scope.resetForm = resetForm;

        //Populate option on author and genre
        function populate() {
            apiService.genre.query().$promise.then(function (res) {
                $scope.genres = res;
            });
            apiService.author.query().$promise.then(function (result) {
                authors = result;
            });
        }
        // create book entry via api
        function addBook(item) {
            var send = {
                Name: item.BookName,
                Id: item.BookId,
                Price: item.Price,
                GenreId: item.GenreId,
                Description: item.Description,
                AuthorId: null,
                ImgUrl: null
            };
            //set author id 
            apiService.book.query().$promise.then(function (res) {
                bkl = res;
                send.Id =parseInt(bkl.pop().Id)+1;
                //store image file under book id 
                var file = $scope.item.imageFile;
                var uploadUrl = "/Images/upload";
                send.ImgUrl = '/Content/img/' + send.Id +'.'+ file.name.split('.').pop().toLowerCase();
                send.AuthorId = existService.authorExist($scope.item.AuthorName, authors);
                fileUpload.uploadFileToUrl(file, send.Id, uploadUrl);
                apiService.book.save(send).$promise.then(function (res) {
                    alert("Book entry successfully uplodad");
                }, function (res) {
                    alert("Book entry failed to add.");
                });
            });

        }

        // reset form to empty field
        function resetForm() {
            $scope.item = {
                BookName: "",
                AuthorName: "",
                Price: null,
                BookId: null,
                Description: "",
                ImgUrl: null
            };
        }

        //sent back to book list view
        function goToIndex() {
            $location.url('/');
        }
    }
]);