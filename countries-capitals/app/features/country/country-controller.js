
app.controller('CountryCtrl',['$scope','$location','countryDetails',function($scope,$location,countryDetails) {
	$scope.country = countryDetails;
	$scope.go = function(path){
		$location.path(path);	
	};

}]);