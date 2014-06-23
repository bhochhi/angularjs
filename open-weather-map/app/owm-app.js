angular.module('OWMApp', ['ngRoute'])
.value('ownCities',['New York', 'Dallas', 'Chicago'])
.config(function($routeProvider){
	$routeProvider.when('/',{
		templateUrl:'./home.html',
		controller:'HomeCtrl'
	}).when('/cities/:city',{
		templateUrl:'./city.html',
		controller:'cityCtrl',
		resolve:{
			city: function(ownCities,$route,$location){
				var city=$route.current.params.city;
				if(ownCities.indexOf(city)==-1){
					$location.path('/error');
					rerturn;
				}
				return city;
			}
		}
	})
	.when('/error', {
		template : '<p>Error Page Not Found</p>'
	})
	.otherwise({
		redirectTo:'/error'
	});
})
.controller('HomeCtrl',function($scope){

})
.controller('cityCtrl',function($scope,city){
	$scope.city =city;
});