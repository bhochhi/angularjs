app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	$routeProvider
	.when("/", {
		templateUrl : "./features/home/home-partial.html",
		controller : 'HomeCtrl'
	});
}]);