tempApp.factory('http', function($rootScope,$http,$q,Modules_Config,$state,$location,messageFactory) {
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
				messageFactory.closeLoading();
			}
			if(data.code=="401"){
				 $state.go("login");
				return;
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
				messageFactory.closeLoading();
			}
		});
	}

	factory.get = function(url, params,success,error) {
		$http({
			method : 'GET',
			url : url,
			data : $.param(params==undefined?{}:params)
		}).success(function(data, status, headers, config) {
			success(data);
		}).error(function(data, status, headers, config) {
			error(data);
			messageFactory.closeLoading();
		});
	}
	
	factory.Qpost = function(url, params) {
		var deferred = $q.defer();
		$http({
			method : 'POST',
			url : url,
			data : $.param(params),
			headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function(data, status, headers, config) {
			deferred.resolve(data); 
		}).error(function(data, status, headers, config) {
//			 $state.go("login");
			deferred.reject(data);
		});
		return deferred.promise;
	}
	return factory;
});
