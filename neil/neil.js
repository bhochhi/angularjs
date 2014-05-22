var app = angular.module('neilApp',[]);

app.controller('newCtrl',function($scope){
	$scope.post = "";
	$scope.description = "";

	$scope.clear = function(){
		$scope.post = "";
		$scope.description = "";	
	}
});