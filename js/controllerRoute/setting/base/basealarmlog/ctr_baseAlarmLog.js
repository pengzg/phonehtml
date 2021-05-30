tempApp.controller('ctr_baseAlarmLog', function($scope,$stateParams,$state,http,EzConfirm,messageFactory,dateUtil,$timeout,$rootScope) {
	$scope.pager = {page:1,rows:'20',sort:'bal_addtime',order:' DESC',pageList:['10','20','30'],bal_shopid:$rootScope.USER.shopId};

   
	$scope.searchParam = {};
	$scope.vo = {};
	$scope.dateNow = dateUtil.getDate2();
	$scope.searchParam.startDate = $scope.dateNow;
	$scope.searchParam.endDate = $scope.dateNow;
	$('#start_date').val($scope.dateNow);
	$('#end_date').val($scope.dateNow);

	if ($stateParams.bal_storeid != undefined) {
    	$scope.searchParam.bal_storeid = $stateParams.bal_storeid;
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

		var url = '/admin/base/baseAlarmLogControl/dataGrid.action';
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
	$scope.alarmList = [];
	$scope.queryAlarmList = function(){
		var success = function(result){
		
			$scope.alarmList = result.data;
			 $scope.alarmList.unshift({'bd_code':'','bd_name':"全部"});
		  }
		  var error = function(result){
			  messageFactory.closeLoading();
			  messageFactory.showMessage('error',result.desc);
		  }
		var url = '/admin/base/baseDataControl/detailItem.action?codekey=2161';
		http.post(url,null,success,error);
	}
	$scope.queryAlarmList();




	// 清除数据
	$scope.clearParams = function(){
		$scope.searchParam.searchKey='';
		$scope.searchParam.bal_storeid='';

		$scope.searchParam.bal_alarmcode='';

		$('#start_date').val($scope.dateNow);
		$('#end_date').val($scope.dateNow);
		
		
	}
	
	
	
})