tempApp.controller('ctr_csCustomerDetail', function($scope, $rootScope, $location,
		$state,$timeout,http,$stateParams,EzConfirm,messageFactory) {
	
	$scope.csCustomerInfo = {};
	/**
	 * 查询
	 */
	$scope.queryDetail = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.csCustomerInfo = result.data;
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
		}
		var url = '/admin/base/csCustomerControl/querycsCustomer.action';
		http.post(url,{cs_id:$stateParams.cs_id},success,error);
	}
	
	
	/**
	 * 
	 */
	$scope.cancel = function(){
		$state.go('index.csCustomerList');
	}
	
	$scope.queryDetail();
})