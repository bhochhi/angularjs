angular.module('valApp',[])
.controller('valCtrl',function($scope){
	$scope.submit = function(){
		console.log('Form Submitted: ', $scope.data);	
	};
});