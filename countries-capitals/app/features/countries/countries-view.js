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