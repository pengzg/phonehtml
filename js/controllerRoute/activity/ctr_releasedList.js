tempApp.controller('ctr_releasedList', function($scope,EzConfirm,messageFactory,http,$state) {
    $scope.pager = {page:1,rows:'10',sort:'mm_addtime',order:'desc',pageList:['10','20','30']};
    $scope.searchParam = {};
   
	$scope.offSell = function(){
		EzConfirm.create({
			heading : '提示',
			text : '确认下架吗？'
		}).then(function() {
			//console.log('删除')
		}, function() {
			//console.log('取消？')
		});
	}
	
    
	/**
	 * 查询列表
	 */
	$scope.queryList = function(){
		
		messageFactory.showLoading();
		var success = function(result){
			$scope.mmList = result.data.rows;
			$scope.pager.total=result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		$scope.searchParam.mm_state = 3;
		var url = '/admin/activity/marketingMainControl/dataGrid.action';
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
	 * 监听
	 */
	$scope.$watch(function(){
		var newValue = $scope.pager.page+' '+$scope.pager.rows+' '+$scope.pager.sort+' '+$scope.pager.order+' ';
		return newValue;
	},$scope.queryList);
	
	/**
	 * 跳转到详情
	 */
	$scope.goDetail = function(ms_id) {
		$state.go("index.seller.sellerManageAdd",{ms_id:ms_id});
	}
	
	/**
	 * delete
	 */
	 $scope.deleteActivity = function(x){
		 
		var success = function(result){
			$scope.queryList();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		var url = '/admin/activity/marketingMainControl/delete.action';
		 
		EzConfirm.create({
			heading : '提示',
			text : '确认删除吗？'
		}).then(function() {
			http.post(url,{"mm_id":x.mm_id},success,error);
		}, function() {
			//console.log('取消？')
		});
	}

	 
	    /**
	     * 发布活动
	     */
	    $scope.updateState = function(x,state){
	    	var success = function(result){
	    		messageFactory.showMessage('success',result.desc);
	    		$scope.queryList();
			};
			var error = function(result){
				messageFactory.closeLoading();
				messageFactory.showMessage('error',result.desc);
			};
			var data ={"mm_id":x.mm_id,"mm_state":state};
			var url = '/admin/activity/marketingMainControl/updateState.action';
			EzConfirm.create({
				heading : '提示',
				text : '确定是否要取消发布该活动？'
			}).then(function() {
				messageFactory.showLoading();
				http.post(url,data,success,error);
			}, function() {

			});
	    }
})