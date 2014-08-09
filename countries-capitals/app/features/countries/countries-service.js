
app.service('Countries',['$resource','$q','$http',function($resource,$q,$http){
//		return $resource('http://api.geonames.org/countryInfoJSON',   		                {username:'rbhochhi'},{
//			list:{
//				method:'GET',
//				cache:true
//			}
//		});	

	this.list =  function(){
		var defer = $q.defer();
		$http.get('http://api.geonames.org/countryInfoJSON?username=rbhochhi', { cache: true })
		.success(function (data) {

			defer.resolve(_.map(data.geonames,function(item){
				console.log("calling map");
				return 	{
					name:item.countryName,
					countryCode:item.countryCode,
					capital:item.capital,
					area:item.areaInSqKm,
					population:item.population,
					continent:item.continent
				}
			}));
		});
		return defer.promise;
	}
}]);