tempApp.controller('ctr_gsCategoryDetail', function($scope, $rootScope, $location,
		$state,$timeout,http,$stateParams,EzConfirm,messageFactory) {
	
	$scope.gsCategoryInfo = {};
	/**
	 * 查询
	 */
	$scope.queryDetail = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.gsCategoryInfo = result.data;
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
		}
		var url = '/admin/goods/gsCategoryControl/getDetail.action';
		http.post(url,{gc_id:$stateParams.gc_id},success,error);
	}
	
	
	/**
	 * 
	 */
	$scope.cancel = function(){
		$state.go('index.gsCategoryList');
	}
	
	$scope.queryDetail();
})