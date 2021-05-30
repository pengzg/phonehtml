tempApp.controller('ctr_baseMonitoringLog', function($scope,$stateParams,$state,http,EzConfirm,messageFactory,dateUtil,$timeout,$rootScope) {
	$scope.pager = {page:1,rows:'20',sort:'bml_id',order:' DESC',pageList:['10','20','30'],bml_shopid:$rootScope.USER.shopId};
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
	var queryLogList = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.logList = result.data.rows;
			$scope.pager.total=result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
		}

		var url = '/admin/base/baseMonitoringLogControl/dataGrid.action';
		http.post(url,$.extend({}, $scope.pager, $scope.searchParam),success,error);
	}

	
	/**
	 * 条件查询
	 */
	
	$scope.searchFun = function(){
		$scope.searchParam.startDate = $('#start_date').val();
		$scope.searchParam.endDate = $('#end_date').val();
		if($scope.pager.page==1){
			queryLogList();
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
	},queryLogList);
	
	
	

	
	/**
	 * 查询仓库
	 */
	$scope.getStoreHouse = function(){
		var success = function(result){
			$scope.storeList = result.data;
			for (i in $scope.storeList) {
				$scope.storeList[i].bs_name = $scope.storeList[i].bs_name+"("+$scope.storeList[i].bs_code+")";
			}
			$scope.storeList.unshift({'bs_code':'','bs_name':'请选择柜子'});
		}
		var error = function(){
			
		}
		var url = "/admin/base/baseStorehouseControl/queryItemList.action";
		http.post(url,{searchKey:"", "bs_type":4,bs_shopid:$rootScope.USER.shopId},success,error);
	}
	$scope.getStoreHouse();

		/**
	 * 查询故障描述列表
	 */
	$scope.faultList = [];
	$scope.queryFaultList = function(){
		var success = function(result){
			 for(var x in result.data){
				var code = result.data[x].bd_code; 
				var name = result.data[x].bd_name;
				var str = {'bd_code':code,'bd_name':name};
				$scope.faultList.push(str);
			 }
			 $scope.faultList.unshift({'bd_code':'','bd_name':"全部"});
		  }
		  var error = function(result){
			  messageFactory.closeLoading();
			  messageFactory.showMessage('error',result.desc);
		  }
		var url = '/admin/base/baseDataControl/detailItem.action?codekey=2159';
		http.post(url,null,success,error);
	}
	$scope.queryFaultList();




	// 清除数据
	$scope.clearParams = function(){
		$scope.searchParam.searchKey='';
		$scope.searchParam.bml_storeid='';
		$scope.searchParam.bml_repair_state='';
		$scope.searchParam.bml_source_type='';
		$scope.searchParam.bml_fault_type='';
		$scope.searchParam.bml_state = "";
		$('#start_date').val($scope.dateNow);
		$('#end_date').val($scope.dateNow);
		
		
	}
	
	
	
})