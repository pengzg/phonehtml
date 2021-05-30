tempApp.factory('http', function($rootScope,$http) {
	var factory = {};
	var httpListLen = 0;
	factory.post = function(url, params,success,error) {
		$rootScope.isLoadAnimationShow = true;
		httpListLen++;
		$http({
			method : 'POST',
			url : url,
			data : $.param(params==undefined?{}:params),
			headers : { 'Content-Type': 'application/x-www-form-urlencoded' }/*改变传入的类型是对象*/
		}).success(function(data, status, headers, config) {
			httpListLen--;
			if(httpListLen<=0){
				$rootScope.isLoadAnimationShow = false;
			}
			if(data.code=="200"){
				success(data);
			}else{
				error(data);
			}
		}).error(function(data, status, headers, config) {
			httpListLen--;
			if(httpListLen<=0){
				$rootScope.isLoadAnimationShow = false;
			}
		});
	}
	return factory;
});
