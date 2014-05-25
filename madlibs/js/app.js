angular.module('madlibs',[])
.controller('myCtrl',function($scope){
	var words = [
		{
			id:"male_name",
			value:"",
			placeholder:"male name"
		},{
			id:"dirty_task",
			value:"",
			placeholder:"dirty task"
		},{
			id:"obnoxious_celebrity",
			value:"",
			placeholder:"obnoxious celebrity"
		},{
			id:"job_title",
			value:"",
			placeholder:"Job title"
		},{
			id:"celebrity",
			value:"",
			placeholder:"celebrity"
		},{
			id:"huge_number",
			value:"",
			placeholder:"huge number"
		},{
			id:"useless_skill",
			value:"",
			placeholder:"useless skill"
		},{
			id:"tedious_task",
			value:"",
			placeholder:"tedious task"
		},{
			type:"adjective",
			value:"",
			placeholder:"adjective"
		}];
	$scope.words = words;
	$scope.getWord = function(type){
		var i;
		for(i=0;i<words.length;i++){
			if(words[i].id==type){
				if(words[i].value==''){
					return words[i].placeholder;
				}
				return words[i].value;
			}
		}	
		return '';
	}

	$scope.displayStory = false;
	$scope.displayWords = true;

	$scope.submit = function(){
		if($scope.myForm.$valid){
			$scope.displayStory = true;
			$scope.displayWords = false;
		}
	}
});