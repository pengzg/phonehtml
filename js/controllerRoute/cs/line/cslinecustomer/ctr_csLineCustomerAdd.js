tempApp.controller('ctr_csLineCustomerAdd', function($scope, $rootScope, $location,
		$state,$timeout,http,$stateParams,EzConfirm,messageFactory) {
	
	$scope.csLineCustomerInfo = {};
	$scope.csLineCustomerInfo.clc_id = $stateParams.clc_id;
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
	
	/**
	 * 提交保存
	 */
	$scope.submit = function(){
		var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			$state.go('index.csLineCustomerList');
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var url = '/admin/line/csLineCustomerControl/update.action';
		var msg = '您确定添加本条记录吗？';
		if($stateParams.clc_id!=undefined&&$stateParams.clc_id!=''){
			msg = '您确定修改本条记录吗？';
		}
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {
			messageFactory.showLoading();
			http.post(url, $scope.csLineCustomerInfo, success, error);
		}, function() {

		});
	}
	
	if($scope.csLineCustomerInfo.clc_id!=undefined&&$scope.csLineCustomerInfo.clc_id!=''){
		$scope.queryDetail()
	}
	
})