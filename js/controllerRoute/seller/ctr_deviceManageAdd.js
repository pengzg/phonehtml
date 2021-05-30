tempApp.controller('ctr_deviceManageAdd', function($scope,$rootScope,$state,http,messageFactory,EzConfirm) {
	$scope.deviceType = [{id:'1',value:'普通设备'},{id:'2',value:'激活码设备'}];
	$scope.vo = {};
	$scope.vo.me_type="1";
	/**
     * 查询设备分组
     */
    $scope.queryGroup = function(){
    	messageFactory.showLoading();
		var success = function(result){
			$scope.deviceGroupList = result.data;
			$scope.vo.me_groupid = result.data[0].meg_id;
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		};
		var url = '/admin/member/memberEquipmentGroupControl/getList.action';
		http.post(url,{'meg_type':1},success,error);
    }
    $scope.queryGroup();
    
    /**
     * 添加设备
     */
    $scope.insertDevice = function(){
    	messageFactory.showLoading();
    	var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			$state.go('index.seller.deviceManage');
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		};
		
		if ($scope.vo.addType == 1) {
			var num = $("#me_num").val();
			if (!num) {
				messageFactory.showMessage('error',"请输入设备序列号");
				return;
			}
		}
		if ($scope.vo.addType == 2) {
			var startNum = $("#startNum").val();
			var endNum = $("#endNum").val();
			if (!startNum || !endNum) {
				messageFactory.showMessage('error',"请输入设备序列号");
				return;
			}
			
			if (parseInt(startNum) >= parseInt(endNum)) {
				messageFactory.showMessage('error',"序列号结束值应大于开始值");
				return;
			}
		}
		var url = '/admin/member/memberEquipmentControl/insertEquipment.action';
		http.post(url,$scope.vo,success,error);
    }
    
})