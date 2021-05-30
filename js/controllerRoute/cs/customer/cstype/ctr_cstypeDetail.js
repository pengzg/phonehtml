tempApp.controller('ctr_csTypeDetail', function($scope, $rootScope, $location,
		$state,$timeout,http,$stateParams,EzConfirm,messageFactory) {
	
	$scope.csTypeInfo = {};
	/**
	 * 查询
	 */
	$scope.queryDetail = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.csTypeInfo = result.data;
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
		}
		var url = '/admin/base/csTypeControl/querycsType.action';
		http.post(url,{ct_id:$stateParams.ct_id},success,error);
	}
	
	
	/**
	 * 
	 */
	$scope.cancel = function(){
		$state.go('index.csTypeList');
	}
	
	$scope.queryDetail();
})