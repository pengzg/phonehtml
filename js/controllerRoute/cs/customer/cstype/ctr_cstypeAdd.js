tempApp.controller('ctr_csTypeAdd', function($scope, $rootScope, $location,
		$state,$timeout,http,$stateParams,EzConfirm,messageFactory) {
	
	$scope.csTypeInfo = {};
	$scope.csTypeInfo.ct_id = $stateParams.ct_id;
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
	
	/**
	 * 提交保存
	 */
	$scope.submit = function(){
		var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			$state.go('index.csTypeList');
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var url = '/admin/base/csTypeControl/update.action';
		if($scope.myform.$valid){
			var msg = '您确定添加本条记录吗？';
			if($stateParams.ct_id!=undefined&&$stateParams.ct_id!=''){
				msg = '您确定修改本条记录吗？';
			}
			EzConfirm.create({
				heading : '提示',
				text : msg
			}).then(function() {
				messageFactory.showLoading();
				http.post(url, $scope.csTypeInfo, success, error);
			}, function() {

			});
        }
	}
	
	if($scope.csTypeInfo.ct_id!=undefined&&$scope.csTypeInfo.ct_id!=''){
		$scope.queryDetail()
	}
	
	$scope.checkFun = function(name,type){
		if(type=='focus'){
			$scope.myform[name+'_flag']=true;
		}
		if(type=='blur'){
			$scope.myform[name+'_flag']=false;
		}
	}
	
})