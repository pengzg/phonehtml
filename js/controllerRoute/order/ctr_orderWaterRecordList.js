tempApp.controller('ctr_orderWaterRecordList', function($scope,
		$state,http,EzConfirm,messageFactory,$rootScope) {
	$scope.pager = {page:1,rows:'20',sort:'owr_ts',order:'desc',pageList:['10','20','30'],owr_shopid:$rootScope.USER.shopId};
	$scope.searchParam = {};
	$scope.vo = {};
	
	/**
	 * 查询数据
	 */
	var queryTicket = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.ticketList = result.data.rows;
			$scope.pager.total=result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
		}
		var url = '/admin/ticket/orderWaterRecordControl/dataGrid.action';
		http.post(url,$.extend({}, $scope.pager, $scope.searchParam),success,error);
	}
	
	/**
	 * 条件查询
	 */
	$scope.doSearch = function(){
		$scope.searchParam.startDate = $("#start_date").val();
		$scope.searchParam.endDate = $("#end_date").val();
		if($scope.pager.page!=1){
			$scope.pager.page = 1;
		}
		queryTicket();
	}
	
	$scope.searchFun = function(){
		$scope.searchParam.startDate = $("#start_date").val();
		$scope.searchParam.endDate = $("#end_date").val();
		if($scope.pager.page==1){
			queryTicket();
		}else{
			$scope.pager.page = 1;
		}
	}
	$scope.goTicketV = function(x){
		$state.go('index.order.ticketVList', {tv_ticketid: x.tm_id});
	}
	
	/**
	 * 排序方法
	 */
	$scope.sortFun = function(name,flag){
		if(!flag){
			return 'colorCenter noSortCss';
		}
		if($scope.pager.sort==name&&$scope.pager.order=='asc'){
			return 'SortAscCss'
		}
		if($scope.pager.sort==name&&$scope.pager.order=='desc'){
			return 'SortDescCss'
		}
	}
	
	/**
	 * 点击切换排序
	 */
	$scope.clickSortFun = function(name){
		if($scope.pager.sort!=name){
			$scope.pager.sort = name;
			$scope.pager.order = 'asc';
		}
		if($scope.pager.sort==name){
			if($scope.pager.order=='asc'){
				$scope.pager.order = 'desc';
			}else{
				$scope.pager.order = 'asc';
			}
		}
	}
	
	$scope.queryBuyList = function(){
		$scope.buyList = [];
		var success = function(result){
			 for(var x in result.data){
				var code = result.data[x].bd_code; 
				var name = result.data[x].bd_name;
				var str = {'bd_code':code,'bd_name':name};
				$scope.buyList.push(str);
			 }
			 $scope.buyList.unshift({'bd_code':'','bd_name':"全部类型"});
		  }
		  var error = function(result){
			  messageFactory.closeLoading();
			  messageFactory.showMessage('error',result.desc);
		  }
		var url = '/admin/base/baseDataControl/detailItem.action?codekey=2173';
		http.post(url,null,success,error);
	}
	$scope.queryBuyList();
	
	$scope.queryUseStateList = function(){
		$scope.useStateList = [];
		var success = function(result){
			 for(var x in result.data){
				var code = result.data[x].bd_code; 
				var name = result.data[x].bd_name;
				var str = {'bd_code':code,'bd_name':name};
				$scope.useStateList.push(str);
			 }
			 $scope.useStateList.unshift({'bd_code':'','bd_name':"全部状态"});
		  }
		  var error = function(result){
			  messageFactory.closeLoading();
			  messageFactory.showMessage('error',result.desc);
		  }
		var url = '/admin/base/baseDataControl/detailItem.action?codekey=2172';
		http.post(url,null,success,error);
	}
	$scope.queryUseStateList();
	
	/**
	 * 监听
	 */
	$scope.$watch(function(){
		var newValue = $scope.pager.page+' '+$scope.pager.rows+' '+$scope.pager.sort+' '+$scope.pager.order+' ';
		return newValue;
	},queryTicket);

			/**
	 * 查询仓库
	 */
	$scope.storeList = [];
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
	 * 清空
	 */
	$scope.clearInput = function(){
		$scope.searchParam.searchKey = '';
		$scope.searchParam.owr_storeid = '';
		$scope.searchParam.owr_state = '';
		$scope.searchParam.owr_sourcetype = '';
		$('#start_date').val("");
		$('#end_date').val("");
		$scope.searchParam.startDate = "";
		$scope.searchParam.endDate = "";
	}
	
})