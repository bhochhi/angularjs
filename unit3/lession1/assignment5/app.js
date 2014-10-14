angular.module('myApp', [])

    .directive('makeEditable', function ($sce) {
        return {
            templateUrl: './edit-partial.html',
            restrict: 'A',
            scope: true,
            transclude: true,
            link: function (scope, element, attrs) {
                console.log(element);
                scope.contentEditable = true;
                scope.toggle = function () {
                    scope.contentEditable = !scope.contentEditable;

                }
            }
        }
    });