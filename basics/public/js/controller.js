var myApp = angular.module('myApp', []);

myApp.controller('myController', function ($scope) {
    $scope.students = [
        {'name': 'Rupesh',
            'age': '22'},
        {'name': 'Sang',
            'age': '1'},
        {'name': 'Drae',
            'age': '56'}
    ];

    $scope.orderProp = 'age';
    $scope.addStudent = function (name, age) {
        $scope.students.push({name: name, age: age});
    };

    $scope.name = "World";
});

myApp.controller("Ctrl",function($scope){
    $scope.text = 'me@example.com';
});
