
angular.module('waitStaffApp',[])
.controller('mainCtrl',function($scope){
	$scope.reset = function(){
		$scope.baseMeal = {};
		$scope.customerCharge ={}
		$scope.earning = {
			totalTip:0.00,
			mealCount:0,
			averageTip:0.00
		};
		
	};
	$scope.$watch('baseMeal',function(newVal,oldVal){
		var sub = $scope.baseMeal.basePrice || 0;
		$scope.customerCharge.subTotal = sub*(1+0.01*$scope.baseMeal.taxRate) || 0;
		$scope.customerCharge.tip = sub*(1+0.01*$scope.baseMeal.tipPercent) || 0;
		$scope.customerCharge.total = $scope.customerCharge.subTotal + $scope.customerCharge.tip;
	},true);

	$scope.submit = function(){
		$scope.earning.totalTip +=$scope.customerCharge.tip;
		$scope.earning.mealCount++;
		$scope.earning.averageTip = $scope.earning.totalTip/$scope.earning.mealCount;		
		$scope.cancel();
	}

	$scope.cancel = function(){
		$scope.baseMeal.basePrice = undefined;
		$scope.baseMeal.tipPercent = undefined;
		$scope.baseMeal.taxRate = undefined;
	}
	$scope.reset();
});