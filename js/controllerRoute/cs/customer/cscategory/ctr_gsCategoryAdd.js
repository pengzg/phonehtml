tempApp.controller('ctr_gsCategoryAdd', function($scope, $rootScope, $location,
		$state,$timeout,http,$stateParams,EzConfirm,messageFactory) {
	
	$scope.gsCategoryInfo = {};
	$scope.gsCategoryInfo.gc_id = $stateParams.gc_id;
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
	
	/**
	 * 提交保存
	 */
	$scope.submit = function(){
		var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			$state.go('index.gsCategoryList');
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var url = '/admin/goods/gsCategoryControl/update.action';
		var msg = '您确定添加本条记录吗？';
		if($stateParams.gc_id!=undefined&&$stateParams.gc_id!=''){
			msg = '您确定修改本条记录吗？';
		}
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {
			messageFactory.showLoading();
			http.post(url, $scope.gsCategoryInfo, success, error);
		}, function() {

		});
	}
	
	if($scope.gsCategoryInfo.gc_id!=undefined&&$scope.gsCategoryInfo.gc_id!=''){
		$scope.queryDetail()
	}
	
})