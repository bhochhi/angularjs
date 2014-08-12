angular.module('valApp',[])
.controller('valCtrl',function($scope){
	$scope.submit = function(){
		console.log('Form Submitted: ', $scope.data);	
	};
	$scope.username = "bhochhi"
	$scope.title ="Rupesh";
	$scope.show = false;
	$scope.doSomething = function(){
		console.log("Hellosde");
	}
});