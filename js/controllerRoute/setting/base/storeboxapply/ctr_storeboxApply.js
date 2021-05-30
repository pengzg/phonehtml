tempApp.controller('ctr_storeboxApply', function($scope,$stateParams,$state,http,EzConfirm,messageFactory,dateUtil,$timeout,$rootScope) {
	$scope.pager = {page:1,rows:'20',sort:'bsa_addtime',order:' DESC',pageList:['10','20','30'],bml_shopid:$rootScope.USER.shopId};
    // 状态 
    $scope.stateList = [{"id":"","name":"全部"},{"id":1,"name":"正常"},{"id":2,"name":"离线"},{"id":3,"name":"故障"}];
    // 来源
    $scope.sourceList = [{"id":"","name":"全部"},{"id":1,"name":"柜子上报"},{"id":2,"name":"后台上报"}];
    // 维修状态 
	$scope.repairList = [{"id":"","name":"全部"},{"id":1,"name":"未处理"},{"id":2,"name":"已派单"},{"id":3, "name":"已维修"}];
	$scope.searchParam = {};
	$scope.vo = {};
	$scope.dateNow = dateUtil.getDate2();
	$scope.searchParam.startDate = $scope.dateNow;
	$scope.searchParam.endDate = $scope.dateNow;
	$('#start_date').val($scope.dateNow);
	$('#end_date').val($scope.dateNow);
	
	if ($stateParams.bol_box_id != undefined) {
    	$scope.searchParam.bol_box_id_like = $stateParams.bol_box_id;    	
    }
	if ($stateParams.bol_storeid != undefined) {
    	$scope.searchParam.bol_storeid = $stateParams.bol_storeid;
    }

	
	/**
	 * 查询数据
	 */
	var queryList = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.dataList = result.data.rows;
			$scope.pager.total=result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
		}

		var url = '/admin/base/baseStoreboxApplyControl/dataGrid.action';
		http.post(url,$.extend({}, $scope.pager, $scope.searchParam),success,error);
	}

	
	/**
	 * 条件查询
	 */
	
	$scope.searchFun = function(){
		$scope.searchParam.startDate = $('#start_date').val();
		$scope.searchParam.endDate = $('#end_date').val();
		if($scope.pager.page==1){
			queryList();
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
	},queryList);
	
	
	

	







	// 清除数据
	$scope.clearParams = function(){
		$scope.searchParam.searchKey='';
	
		$('#start_date').val($scope.dateNow);
		$('#end_date').val($scope.dateNow);
		
	}
	
	
	
})