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