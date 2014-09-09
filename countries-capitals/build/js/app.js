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
app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	$routeProvider
	.when("/", {
		templateUrl : "./features/home/home-partial.html",
		controller : 'HomeCtrl'
	});
}]);

app
.controller('HomeCtrl',['$scope','$location',function($scope,$location) {

	
	$scope.go = function(path){
		$location.path(path);
	};

}]);

app.service('Countries',['$resource','$q','$http',function($resource,$q,$http){
//		return $resource('http://api.geonames.org/countryInfoJSON',   		                {username:'rbhochhi'},{
//			list:{
//				method:'GET',
//				cache:true
//			}
//		});	

	this.list =  function(){
		var defer = $q.defer();
		$http.get('http://api.geonames.org/countryInfoJSON?username=rbhochhi', { cache: true })
		.success(function (data) {

			defer.resolve(_.map(data.geonames,function(item){
				return 	{
					name:item.countryName,
					countryCode:item.countryCode,
					capital:item.capital,
					area:item.areaInSqKm,
					population:item.population,
					continent:item.continent
				}
			}));
		});
		return defer.promise;
	}
}]);
app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when("/countries", {
		templateUrl : "./features/countries/countries-partial.html",
		controller : 'CountriesCtrl'
//		,
//		resolve:{
//			Countries:function(){
//				return [{name:"Rupesh"}];
//			}
//		}
	});
}]);

//var _ = require('lodash');
app.controller('CountriesCtrl',['$scope','$location','Countries',function($scope,$location,Countries) {
	//	Countries.list().$promise.then(function(data){
	//			$scope.countries = _.map(data.geonames,function(item){
	//				
	//				return 	{
	//					name:item.countryName,
	//					countryCode:item.countryCode,
	//					capital:item.capital,
	//					area:item.areaInSqKm,
	//					population:item.population,
	//					continent:item.continent
	//				}
	//			});
	//		});	

	Countries.list().then(function(data){
		$scope.countries = data;
	});

	$scope.go = function(path){
		$location.path(path);	
	};



}]);
app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when("/country/:countryCode", {
		templateUrl : "./features/country/country-partial.html",
		controller : 'CountryCtrl'
		,
		resolve:{
			countryDetails:function($q,$http,$route){
				var defer = $q.defer();
				function countryDetails(){
					var countryCode=$route.current.params.countryCode;
					var defer = $q.defer();

					$http.get('http://api.geonames.org/countryInfoJSON?username=rbhochhi&country='+countryCode, { cache: true })
					.success(function (data) {
						defer.resolve( _.map(data.geonames,function(item){
							return 	{
								name:item.countryName,
								countryCode:item.countryCode,
								capital:item.capital,
								area:item.areaInSqKm,
								population:item.population,
								geonameId:item.geonameId
							}
						})[0]);
					});
					return defer.promise;
				}

				function capitalDetails(countryDetails){
					var defer = $q.defer();
					$http.get('http://api.geonames.org/search?type=json&username=rbhochhi&maxRows=1&style=LONG&q=capital&isNameRequired=true&country='+countryDetails.countryCode+'&name='+countryDetails.capital, { cache: true })
					.success(function (data) {
						countryDetails.capitalPopulation = data.geonames[0].population;
						countryDetails.capital = data.geonames[0].toponymName

						defer.resolve(countryDetails);
					});
					return defer.promise;
				}

				function neighbor(countryDetails){
					var defer = $q.defer();
					$http.get('http://api.geonames.org/neighbours?type=json&username=rbhochhi&geonameId='+countryDetails.geonameId, { cache: true })
					.success(function (data) {
						countryDetails.neighbors = {
							count : data.totalResultsCount,
							countries : _.map(data.geonames,function(item){
								return 	{
									name:item.countryName,
									countryCode:item.countryCode
								}
							})
						};
						defer.resolve(countryDetails);
					});
					return defer.promise;
				}

				countryDetails().then(capitalDetails).then(neighbor).then(function(data){
					defer.resolve(data);
				});
				return defer.promise;
			}
		}
	});
}]);

app.controller('CountryCtrl',['$scope','$location','countryDetails',function($scope,$location,countryDetails) {
	$scope.country = countryDetails;
	$scope.go = function(path){
		$location.path(path);	
	};
	
	$scope.go = function(path){
		$location.path(path);
	}

}]);