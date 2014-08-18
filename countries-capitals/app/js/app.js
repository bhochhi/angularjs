var app = angular.module('ccApp', ['ngRoute', 'ngAnimate','ngResource'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.otherwise({
		redirectTo : '/'
	});
}])
.run(function($rootScope,$timeout){
	
	$rootScope.$on('$routeChangeStart', function() {
        $rootScope.isLoading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function() {
      $timeout(function() {
        $rootScope.isLoading = false;
      }, 1000);
    });	
});