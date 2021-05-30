tempApp.controller('ctr_userDetail', function($scope,EzConfirm,messageFactory,http,$state,$stateParams) {
$scope.vo = {};	

    /**
     * 获取用户详情
     */
	 $scope.getDetail = function(id){
		 messageFactory.showLoading();
			var success = function(result){
				$scope.vo = result.data;
				messageFactory.closeLoading();
			}
			var error = function(result){
				messageFactory.closeLoading();
				messageFactory.showMessage('error',result.desc);
				
			}
			var url = '/admin/member/memberBaseControl/getDetail.action';
			http.post(url,{'mb_id':id},success,error);
	 }
	 $scope.getDetail($stateParams.id);
	 
	/**
	 * 返回列表
	 */
	 $scope.backList = function(){
		 $state.go("index.user.userList");
	 }
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	
	 
})