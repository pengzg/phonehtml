tempApp.controller('ctr_activityAdd', function($scope,$rootScope,$state,http,messageFactory) {
	/**
	 * 获取活动类型
	 */
	$scope.queryActivityType = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.activityTypeList  = result.data;
			$state.go('index.activityAdd.calendarList',{mat_id:$scope.activityTypeList[0].mat_id});
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		};
		var url = '/admin/activity/marketingActivityTypeControl/queryActivityType.action';
		http.post(url,{mat_level:0},success,error);
	}
	$scope.queryActivityType();
	
	/**
	 * 选择一级活动类型
	 */
	$scope.selectIndex = 0;
	$scope.selectActivityType = function(obj,index){
		$scope.selectIndex = index;
		if(obj.mat_category == 1){
			$state.go('index.activityAdd.calendarList',{mat_id:obj.mat_id});
		}else{
			$state.go('index.activityAdd.twoDimensionCode',{mat_id:obj.mat_id});
		}
	}
})