tempApp.controller('ctr_activityRecordList', function($scope,EzConfirm,messageFactory,http,$state
		,$stateParams) {
    $scope.pager = {page:1,rows:'10',sort:'mr_ts',order:'desc',pageList:['10','20','30']};
    $scope.pager.mr_activityid=$stateParams.mm_id;
    $scope.searchParam = {};
    $scope.pager.mr_state = '';
    //1 未领取 2 已领取 3 已过期
    $scope.mrStateList = [{'id':'','name':'全部'},{'id':1,'name':'未领取'},{'id':2,'name':'已领取'},{'id':3,'name':'已过期'}];
    $scope.winningstateList = [{'id':'','name':'全部'},{'id':'N','name':'未中奖'},{'id':'Y','name':'已中奖'}];
    $scope.pager.mr_winningstate='';
    /**
	 * 查询列表
	 */
	$scope.queryList = function(){
		
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
		var url = '/admin/activity/marketingRecordControl/dataGrid.action';
		http.post(url,$.extend({},$scope.pager,$scope.searchParam),success,error);
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
     * 重置查询 
     */
	$scope.reset = function(){
		$scope.pager.mr_activityid = '';
		$scope.pager.mr_prizecode = "";
		$scope.pager.phone = '';
		$scope.pager.memberName = '';
		$scope.searchFun();
	}
	
	/**
	 * 监听
	 */
	$scope.$watch(function(){
		var newValue = $scope.pager.page+' '+$scope.pager.rows+' '+$scope.pager.sort+' '
		+$scope.pager.order+' ';
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
	
	
	//查询所有的活动
	$scope.getActivityList = function(){
		
		var success = function(result){
			$scope.activityList = result.data;
			$scope.activityList.unshift({'mm_id':'','mm_name':'全部'});
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		var url = '/admin/activity/marketingMainControl/getMarketingMainList.action';
		http.post(url,{'mm_state_arr':"3,4"},success,error);
	};
	$scope.getActivityList();
	
	
	    
})