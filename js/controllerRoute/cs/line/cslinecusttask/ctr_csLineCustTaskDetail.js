tempApp.controller('ctr_csLineCustTaskDetail', function($scope, $rootScope, $location,
		$state,$timeout,http,$stateParams,EzConfirm,messageFactory) {
	
	$scope.csLineCustTaskInfo = {};
	/**
	 * 查询
	 */
	$scope.queryDetail = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.csLineCustTaskInfo = result.data;
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
		}
		var url = '/admin/line/csLineCustTaskControl/getDetail.action';
		http.post(url,{clct_id:$stateParams.clct_id},success,error);
	}
	
	
	/**
	 * 
	 */
	$scope.cancel = function(){
		$state.go('index.csLineCustTaskList');
	}
	
	$scope.queryDetail();
})