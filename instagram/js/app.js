
angular.module('instaApp',['ngAnimate'])
.controller('searchCtrl',function($scope,$http){

	$scope.search=[];
	$scope.search.results = [];

	$scope.submitted = false;
	$scope.error =false;
	$scope.submit = function(){
		var url = "https://api.instagram.com/v1/tags/"+$scope.search.word+"/media/recent?client_id=b931af3bad0c4edd822e79665a190b26&callback=JSON_CALLBACK";
		$http.jsonp(url)
		.success(function(data){
			if(data.meta.code==200){
				$scope.search.results = [];
				var i,len;
				for(i=0,len=data.data.length;i<len;i++){
					var row = [];					
					if(i<len) row.push(data.data[i]);
					if(i++<len) row.push(data.data[i]);
					if(i++<len) row.push(data.data[i]);
					if(row.length>0) $scope.search.results.push(row);
					
				}

				$scope.submitted = true;
				$scope.error =false;			
				$scope.searched_word = $scope.search.word;
				$scope.search.word=undefined;
				$scope.search.count = len;

			}
			else{
				$scope.error = data.meta.error_message;
				$scope.submitted =false;
				$scope.search.results = [];
			}
		})
		.error(function(data){
			$scope.submitted = false;
			$scope.error = "unable to fetch instagram API. Submit again.";
		});
	}

});

