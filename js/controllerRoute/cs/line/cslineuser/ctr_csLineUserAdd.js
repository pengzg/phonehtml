tempApp.controller('ctr_csLineUserAdd', function($scope, $rootScope, $location,
		$state,$timeout,http,$stateParams,EzConfirm,messageFactory) {
	
	$scope.csLineUserInfo = {};
	$scope.csLineUserInfo.clu_id = $stateParams.clu_id;
	/**
	 * 查询
	 */
	$scope.queryDetail = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.csLineUserInfo = result.data;
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
		}
		var url = '/admin/line/csLineUserControl/getDetail.action';
		http.post(url,{clu_id:$stateParams.clu_id},success,error);
	}
	
	/**
	 * 
	 */
	$scope.cancel = function(){
		$state.go('index.csLineUserList');
	}
	
	/**
	 * 提交保存
	 */
	$scope.submit = function(){
		var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			$state.go('index.csLineUserList');
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var url = '/admin/line/csLineUserControl/update.action';
		var msg = '您确定添加本条记录吗？';
		if($stateParams.clu_id!=undefined&&$stateParams.clu_id!=''){
			msg = '您确定修改本条记录吗？';
		}
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {
			messageFactory.showLoading();
			http.post(url, $scope.csLineUserInfo, success, error);
		}, function() {

		});
	}
	
	if($scope.csLineUserInfo.clu_id!=undefined&&$scope.csLineUserInfo.clu_id!=''){
		$scope.queryDetail()
	}
	
})