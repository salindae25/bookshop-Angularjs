/**
 * 
 */
var bkServices = angular.module("bookStoreApp.bookServices", []);

bkServices.factory("apiService", ['$resource', function ($resource) {
    return {
        book: $resource("/api/Books/:id", {
            id: '@id'
        }, {
            update: {
                method: 'PUT'
            }
        }),
        genre: $resource("/api/Genres/:id", {
            id: '@id'
        }),
        author: $resource("/api/Authors/:id", {
            id: '@id'
        }, {
            update: {
                method: 'PUT'
            }
        }),
        image: $resource("/api/Images/:id", {
            id: '@id'
        })
    }
}]);

bkServices.factory("existService", ['apiService', '$log', function (apiService, $log) {
    return {
        authorExist: authorExist
    };

    function authorExist(name, authors) {
        var authorid = -1;
        for (var i = 0; i < authors.length; i++) {
            if (name == authors[i].Name) {
                authorid = authors[i].Id;
            }
        }
        if (authorid == -1) {
            authorid = authors.length;
            apiService.author.save({
                id: authorid
            }, {
                'Id': authorid,
                'Name': name
            }).$promise.then(function () {
                $log.log('Author successfully added');
            }, function () {
                $llog.error('Failure to add to author');
            })
        }
        return authorid
    }

}]);

bkServices.service('fileUpload', ['$http', '$q', '$log', function ($http, $q, $log) {

    this.uploadFileToUrl = function (data, id, url) {
        var deferred = $q.defer();
        var foramatData = new FormData();
        foramatData.append('aFile', data);
        foramatData.append('id', id);

        $http({
                url: url,
                method: "POST",
                data: foramatData,
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            })
            .then(
                function (resp) {
                    $log.log(resp);
                },
                function (resp) {
                    $log.error(resp);
                }
            );
    }
}]);