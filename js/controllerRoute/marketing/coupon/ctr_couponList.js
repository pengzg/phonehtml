tempApp.controller('ctr_couponList', ['$scope','dateUtil','messageFactory','http','$state','EzConfirm','activityFactory','$rootScope',
function($scope,dateUtil,messageFactory,http,$state,EzConfirm,activityFactory,$rootScope) {
  $scope.pager = {page:1,rows:'20',sort:'cb_add_time',order:'desc',pageList:['10','20','30'],cb_shopid:$rootScope.USER.shopId};

    $scope.stateList = [{"id":"", "name":"全部"},{"id":1, "name":"未发布"},{"id":2, "name":"已发布"},{"id":3, "name":"已取消"}];

	$scope.showType = 1;//1:发布 2：暂存 3：取消发布
	$scope.dialog = 0;
	$scope.searchParam = {};
	$scope.searchParam2 = {};
	$scope.detailList = [];
	$scope.couponTitle = "";

	$scope.dateNow = dateUtil.getDate2();
	/**
	 * 查询列表
	 */
	var queryList = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.dataList = result.data.rows;
			$scope.pager.total=result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		var url = '/admin/coupon/couponBaseControl/dataGrid.action';
		http.post(url,$.extend({},$scope.pager,$scope.searchParam),success,error);
	}
	

		/**
	 * 查询列表
	 */
	$scope.detailPager = {page:1,rows:'20',sort:'cd_id',order:'desc',pageList:['10','20','30'],cb_shopid:$rootScope.USER.shopId};
	var queryDetailList = function(){
		$scope.searchParam2.startDate = $("#start_date").val();
	  	$scope.searchParam2.endDate = $("#end_date").val();
		messageFactory.showLoading();
		var success = function(result){
			$scope.detailList = result.data.rows;
			$scope.detailPager.total=result.data.total;
			$scope.detailPager.pageTotal = Math.ceil($scope.detailPager.total/$scope.detailPager.rows);
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		$scope.searchParam2.cd_coupon_id  = $scope.cd_coupon_id;
		var url = '/admin/coupon/couponDetailControl/dataGrid.action';
		http.post(url,$.extend({},$scope.detailPager,$scope.searchParam2),success,error);
	}


	/**
	 * 监听
	 */
	$scope.$watch(function(){
		var newValue = $scope.pager.page+' '+$scope.pager.rows+' '+$scope.pager.sort+' '+$scope.pager.order+' ';
		
		return newValue;
	},queryList);

	/**
	 * 监听
	 */
	$scope.$watch(function(){
		var newValue = $scope.detailPager.page+' '+$scope.detailPager.rows+' '+$scope.detailPager.sort+' '+$scope.detailPager.order+' ';
		
		return newValue;
	},queryDetailList);
	
	$scope.searchFun = function() {
		if($scope.pager.page==1){
			queryList();
		}else{
			$scope.pager.page = 1;
		}
	}
	$scope.searchFun2 = function() {
		if($scope.detailPager.page==1){
			queryDetailList();
		}else{
			$scope.detailPager.page = 1;
		}
	}

   
    $scope.addCoupon = function(x){
        var url = "";
        url = $state.href('index.marketing.couponadd');
        window.open(url,'_blank');
    }

    $scope.goDetail = function(x){
        var url = "";
        url = $state.href('index.marketing.couponadd',{"cb_id":x.cb_id});
        window.open(url,'_blank');
    }

    	// 清除数据
	$scope.clearParams = function(){
		$scope.searchParam.searchKey='';
	
		$('#start_date').val($scope.dateNow);
		$('#end_date').val($scope.dateNow);
		
	}

	/**
	 * 更新状态
	 */
	$scope.updateState = function(x, state, $event) {
		var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			$scope.searchFun();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var msg = "您确定要操作吗？";
		if (state==2) {
			msg = "您确定要发布吗？";
		} else if (state == 3){
			msg = "您确定要取消发布吗？";
		}
		var url = "/admin/coupon/couponBaseControl/updateState.action"
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {
			messageFactory.showLoading();
			http.post(url,{"cb_id":x.cb_id,"cb_state":state,"cb_version":x.cb_version},success,error);
		}, function() {
			
		});
	}


	$scope.showDialog = function(x){
		$scope.couponTitle = x.cb_title;
		$scope.dialog = 1;
		$scope.cd_coupon_id = x.cb_id;
		queryDetailList();
	};
	$scope.closeDialog = function(){
		$scope.clearParams2();
		$scope.dialog = 0;
	}
    // 清除数据
	$scope.clearParams2 = function(){
			$scope.detailList = [];
		$scope.detailPager.page = 1;
		$scope.searchParam2 = {};
		
		$("#start_date").val("");
		$("#end_date").val("");
			
	}

	/**
	 * 使用状态
	 */
	$scope.useStateList = [];
	$scope.queryUseStateList = function(){
		var success = function(result){
			 
			 $scope.useStateList = result.data;
			 $scope.useStateList.unshift({"bd_code":"","bd_name":"全部"});
		  }
		  var error = function(result){
			  messageFactory.closeLoading();
			  messageFactory.showMessage('error',result.desc);
		  }
		var url = '/admin/base/baseDataControl/detailItem.action?codekey=1021';
		http.post(url,null,success,error);
	}
	$scope.queryUseStateList();
}])