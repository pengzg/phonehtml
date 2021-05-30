tempApp.controller('ctr_csLineCustomerDetail', function($scope, $rootScope, $location,
		$state,$timeout,http,$stateParams,EzConfirm,messageFactory) {
	
	$scope.csLineCustomerInfo = {};
	/**
	 * 查询
	 */
	$scope.queryDetail = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.csLineCustomerInfo = result.data;
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
		}
		var url = '/admin/line/csLineCustomerControl/getDetail.action';
		http.post(url,{clc_id:$stateParams.clc_id},success,error);
	}
	
	
	/**
	 * 
	 */
	$scope.cancel = function(){
		$state.go('index.csLineCustomerList');
	}
	
	$scope.queryDetail();
})