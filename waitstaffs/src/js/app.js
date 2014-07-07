
angular.module('waitStaffApp',['ngRoute','ngAnimate'])
.config(function($routeProvider){
	$routeProvider.when('/',{
		templateUrl:'./home.html'
	})
	.when('/meal',{
		templateUrl:'./meal.html',
		controller:'MealCtrl'
	})
	.when('/earnings',{
		templateUrl:'./earning.html',
		controller:'EarnCtrl'
	})
	.otherwise({
		templateUrl:'./error.html'
	});
})
.controller('HeaderCtrl',function($scope,$location){
	$scope.isActive = function (viewLocation) { 
		return viewLocation === $location.path();
	};
})
.controller('MealCtrl',function($scope,earningService){
	$scope.baseMeal = {};
	$scope.customerCharge ={}
	var earnings = earningService.getEarnings();
	
	
	

	$scope.submit = function(){
		if($scope.customerCharge.total){
			earnings.totalTip +=$scope.customerCharge.tip;
			earnings.mealCount++;
			earnings.averageTip = earnings.totalTip/earnings.mealCount;
		}
		$scope.cancel();
	}

	$scope.cancel = function(){
		$scope.baseMeal.basePrice = undefined;
		$scope.baseMeal.tipPercent = undefined;
		$scope.baseMeal.taxRate = undefined;
	}

	$scope.$watch('baseMeal',function(newVal,oldVal){
		var sub = $scope.baseMeal.basePrice || 0; 
		var tip = $scope.baseMeal.tipPercent || 0;
		var rate = $scope.baseMeal.taxRate || 0;
		$scope.customerCharge.subTotal =sub*(1+ 0.01*rate);
		$scope.customerCharge.tip = 0.01*tip*sub;
		$scope.customerCharge.total = $scope.customerCharge.subTotal + $scope.customerCharge.tip;
	},true);	
})
.controller('EarnCtrl',function($scope,earningService){
	$scope.earnings = earningService.getEarnings();

	$scope.reset = function(){
		earningService.reset();
	}
})
.service('earningService',function(){
	var template_earning= {
		totalTip : 0.00,
		mealCount : 0,
		averageTip : 0.00
	};

	my_earnings = angular.copy(template_earning);

	this.reset = function(){
		angular.copy(template_earning,my_earnings);
	};

	this.getEarnings = function(){
		return my_earnings;
	}

})


.run(function($rootScope,$location,$timeout){
	$rootScope.$on('$routeChangeError',function(){
		$location.path('/error');
	});

	$rootScope.$on('$routeChangeStart',function(){
		$rootScope.isLoading = true;
	});
	
	$rootScope.$on('$routeChangeSuccess',function(){
		$timeout(function(){
			$rootScope.isLoading=false;
		},1000);
	});
	
	
})

;