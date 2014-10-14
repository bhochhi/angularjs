angular.module('myApp',[])

.directive('optIn',function(){
	
	return {
		templateUrl: './login.html',
		restrict:'E',
		transclude:true,
		controller:function($scope){
			$scope.fName = '';
			$scope.lName = '';
			$scope.email = '';
			
			$scope.submit = function(){
				console.log($scope.fName,$scope.lName,$scope.email);
			}
			
		}
	}
});