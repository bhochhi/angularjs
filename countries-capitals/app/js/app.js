var app = angular.module('ccApp', ['ngRoute', 'ngAnimate','ngResource'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.otherwise({
		redirectTo : '/'
	});
}]);