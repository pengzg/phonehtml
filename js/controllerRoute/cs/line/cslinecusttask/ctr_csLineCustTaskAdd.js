tempApp.controller('ctr_csLineCustTaskAdd', function($scope, $rootScope, $location,
		$state,$timeout,http,$stateParams,EzConfirm,messageFactory) {
	
	$scope.csLineCustTaskInfo = {};
	$scope.csLineCustTaskInfo.clct_id = $stateParams.clct_id;
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
	
	/**
	 * 提交保存
	 */
	$scope.submit = function(){
		var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			$state.go('index.csLineCustTaskList');
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var url = '/admin/line/csLineCustTaskControl/update.action';
		var msg = '您确定添加本条记录吗？';
		if($stateParams.clct_id!=undefined&&$stateParams.clct_id!=''){
			msg = '您确定修改本条记录吗？';
		}
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {
			messageFactory.showLoading();
			http.post(url, $scope.csLineCustTaskInfo, success, error);
		}, function() {

		});
	}
	
	if($scope.csLineCustTaskInfo.clct_id!=undefined&&$scope.csLineCustTaskInfo.clct_id!=''){
		$scope.queryDetail()
	}
	
})