
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