tempApp.controller('ctr_memberaccount', function($scope,EzConfirm,messageFactory,http,$state,$stateParams,$rootScope) {
    $scope.pager = {page:1,rows:'20',sort:'ma_addtime',order:'desc',pageList:['10','20','30']};
    $scope.searchParam = {};
    var format = 'yyyy-MM-dd';
	$scope.dateNow = dateRangeUtil.getCurrentMonth(format);
	$scope.startdate = $scope.dateNow[0];
	$scope.enddate = $scope.dateNow[1];
	$scope.searchParam.startDate = $scope.dateNow[0];
	$scope.searchParam.endDate = $scope.dateNow[1];
	$("#start_date").val($scope.startdate);
	$("#end_date").val($scope.enddate);
   
	/**
	 * 查询列表
	 */
	var queryUserList = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.userList = result.data.rows;
			$scope.pager.total = result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		}
		
		var url = '/admin/member/memberAccountControl/dataGrid.action';
		http.post(url,$.extend({},$scope.pager,$scope.searchParam),success,error);
	}
    
	/**
	 * 查询
	 */
	$scope.searchFun = function(){
		$scope.searchParam.startDate = $("#start_date").val();
		$scope.searchParam.endDate = $("#end_date").val();
		if($scope.pager.page==1){
			queryUserList();
		}else{
			$scope.pager.page = 1;
		}
	}
    
	/**
	 * 监听
	 */
	$scope.$watch(function(){
		var newValue = $scope.pager.page+' '+$scope.pager.rows+' '+$scope.pager.sort+' '+$scope.pager.order+' ';
		return newValue;
	},queryUserList);
	
	/**
	 * 显示弹框
	 */
	$scope.showDialog = function(type){
		$scope.dialog = type;
	}
	/**
	 * 关闭弹框
	 */
	$scope.closeDialog = function(){
		$scope.dialog = 0;
	}
	
	
	$scope.clearParams = function(){
		$("#start_date").val($scope.startdate);
		$("#end_date").val($scope.enddate);
		$scope.searchParam.search_key = '';
	}
		
	 
})