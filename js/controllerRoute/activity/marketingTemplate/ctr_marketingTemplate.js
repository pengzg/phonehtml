tempApp.controller('ctr_marketingTemplate', function($scope,EzConfirm,messageFactory,http,$state) {
    $scope.pager = {page:1,rows:'10',sort:'mt_ts',order:'desc',pageList:['10','20','30']};
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
			$scope.mtList = result.data.rows;
			$scope.pager.total=result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		$scope.searchParam.mm_state = 3;
		var url = '/admin/activity/marketingTemplateControl/dataGrid.action';
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
	

	$scope.typepager = {page:1,rows:'9999',sort:'mat_id',order:'desc',pageList:['10','20','30']};
	$scope.queryTypeList = function(){
		var success = function(result){
			$scope.typeList = result.data.rows;
			$scope.typeList.unshift({'mat_id':'','mat_name':"全部类型"});
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		}
		var url = '/admin/activity/marketingActivityTypeControl/dataGrid.action';
		http.post(url,$.extend({},$scope.typepager,$scope.searchParam),success,error);
	}
	$scope.queryTypeList();
	
	$scope.goEdit = function(x) {
		$state.go("index.marketingTemplateAdd", {"mt_id":x.mt_id});
	}
	// 
	$scope.addMt = function(){
		$state.go("index.marketingTemplateAdd");
	}
	// 删除
	$scope.deleteMt = function(x){
		var success = function(result){
			messageFactory.showMessage('success',result.desc);
			$scope.queryList();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		var data = {"mt_id":x.mt_id};
		
		var url = '/admin/activity/marketingTemplateControl/delete.action';
		
		EzConfirm.create({
			heading : '提示',
			text : '确定要删除数据吗？'
		}).then(function() {
			http.post(url,data,success,error);
		}, function() {
			//console.log('取消？')
		});
	}
})