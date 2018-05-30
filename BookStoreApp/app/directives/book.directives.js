/**
 * 
 */
var bkDirectives = angular.module('bookStoreApp.bookDirectives',[]);
bkDirectives.directive('imageModel', [ function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs, ngModel) {

            var extension = ['jpg', 'jpeg', 'bmp', 'png'];

            ngModel.$render();

            element.on('change', function (fileEvent) {
                var file = fileEvent.target;
                scope.$apply(function () {
                    if (file.files[0]) {
                        ngModel.$setViewValue(file.files[0]);
                        ngModel.$validate();
                    }
                });
            });

            ngModel.$validators.image = function (modelValue, viewValue) {
                if (!ngModel.$isEmpty(viewValue)) {
                    var fileExtension = viewValue.name.split('.').pop().toLowerCase();
                    if (extension.indexOf(fileExtension) >= 0) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return true;
                }
            };
        }
    };

}]);