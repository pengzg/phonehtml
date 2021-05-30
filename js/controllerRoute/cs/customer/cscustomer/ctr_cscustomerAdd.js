tempApp.controller('ctr_csCustomerAdd', function($scope, $rootScope, $location,
		$state,$timeout,http,$stateParams,EzConfirm,messageFactory) {
	
	$scope.csCustomerInfo = {};
	$scope.csCustomerInfo.cs_id = $stateParams.cs_id;
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
	
	/**
	 * 提交保存
	 */
	$scope.submit = function(){
		var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			$state.go('index.csCustomerList');
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var url = '/admin/base/csCustomerControl/update.action';
		if($scope.myform.$valid){
			var msg = '您确定添加本条记录吗？';
			if($stateParams.cs_id!=undefined&&$stateParams.cs_id!=''){
				msg = '您确定修改本条记录吗？';
			}
			EzConfirm.create({
				heading : '提示',
				text : msg
			}).then(function() {
				messageFactory.showLoading();
				http.post(url, $scope.csCustomerInfo, success, error);
			}, function() {

			});
        }
	}
	
	if($scope.csCustomerInfo.cs_id!=undefined&&$scope.csCustomerInfo.cs_id!=''){
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