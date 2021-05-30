tempApp.controller('ctr_verificationList', function($scope,EzConfirm,messageFactory,http,$state) {
    $scope.pager = {page:1,rows:'10',sort:'mw_granttime',order:'desc',pageList:['10','20','30']};
    $scope.pager.mw_activityid = '';
    $scope.searchParam = {};

	
    
	/**
	 * 查询列表
	 */
	$scope.queryList = function(){
		
		messageFactory.showLoading();
		var success = function(result){
			$scope.winningList = result.data.rows;
			$scope.pager.total=result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		$scope.searchParam.mm_state = 2;
		var url = '/admin/activity/marketingWinningControl/dataGrid.action';
		http.post(url,$.extend({'mw_state':2},$scope.pager,$scope.searchParam),success,error);
	};
	// $scope.queryList();
    
	/**
	 * 查询
	 */
	$scope.searchFun = function(){
		
		if($scope.pager.page==1){
			$scope.queryList();
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
	},$scope.queryList);
	
    /**
	 * 上一页
	 */
	$scope.prevPage = function(pager,fun){
		if(pager.page==1){
			return;
		}
		pager.page --;
		fun();
	}
	
	/**
	 * 下一页
	 */
	$scope.nextPage = function(pager,fun){
		if(pager.page >= pager.pageTotal){
			return;
		}
		pager.page ++;
		fun();
	}
	
	 /**
     * 重置查询 
     */
	$scope.reset = function(){
		$scope.pager.mw_activityid = '';
		$scope.pager.mw_prizecode = "";
		$scope.pager.phone = '';
		$scope.pager.memberName = '';
		$scope.searchFun();
	}
	
	//查询所有的活动
	$scope.getActivityList = function(){
		
		var success = function(result){
			$scope.activityList = result.data;
			$scope.activityList.unshift({'mm_id':'','mm_name':'全部'});
			//console.log($scope.activityList );
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		var url = '/admin/activity/marketingMainControl/getMarketingMainList.action';
		http.post(url,{},success,error);
	};
	$scope.getActivityList();
	
	    
})