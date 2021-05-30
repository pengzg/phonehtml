tempApp.controller('ctr_setup_workStoreRelation', function($scope,EzConfirm,messageFactory,http,$state,$stateParams,$rootScope) {
    
    $scope.searchParam = {};
    var format = 'yyyy-MM-dd';
	
	$scope.searchParam.msa_dr = 1;
	
	
	/**
	 * 查询列表
	 */
	$scope.pager = {page:1,rows:'20',sort:'msa_work_id DESC,msa_storeid',order:'desc',pageList:['10','20','30'],msa_dr:1,msa_shopid:$rootScope.USER.shopId};
	$scope.queryProductList = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.relationList = result.data.rows;
			$scope.pager.total = result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		}
		var url = '/admin/member/memberStoreAuthorityControl/dataGrid.action';
		http.post(url,$.extend({},$scope.pager,$scope.searchParam),success,error);
	}
    
	/**
	 * 查询
	 */
	$scope.searchFun = function(){
		if($scope.pager.page==1){
			$scope.queryProductList();
		}else{
			$scope.pager.page = 1;
		}
	}
    
	/**
	 * 查询业务员
	 */
	$scope.getStoreHouse = function(){
		var success = function(result){
			$scope.storeList = result.data;
			$scope.storeList.unshift({'mbw_id':'','mbw_name':'请选择工作人员'});
		}
		var error = function(){
			
		}
		
		var url = "/admin/member/memberBaseWorkControl/queryItemList.action";
		http.post(url,{"mbw_dr":"1","mbw_role_str":"2001,2005",mbw_shopid:$rootScope.USER.shopId},success,error);
	}
	$scope.getStoreHouse();
	
	
	/**
	 * 监听
	 */
	$scope.$watch(function(){
		var newValue = $scope.pager.page+' '+$scope.pager.rows+' '+$scope.pager.sort+' '+$scope.pager.order+' ';
		
		return newValue;
	},$scope.queryProductList);
	
	/**
	 * 添加页面
	 */
	$scope.addRelation = function(){
		$state.go("index.setup.workStoreRelationAdd");
	}
	
	/**
	 * 删除 
	 */
	$scope.deleteRelation = function(x) {
		var success = function(result){
			messageFactory.showMessage('success',result.desc);
			$scope.queryProductList();
		}
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
			
		}
		var url = '/admin/member/memberStoreAuthorityControl/delete.action';
		var data = {"msa_id":x.msa_id};
		
		EzConfirm.create({
			heading : '提示',
			text : '确认删除吗？'
		}).then(function() {
			http.post(url,data,success,error);
		}, function() {
			//console.log('取消？')
		});
	}
	
	/**
	 * 编辑柜子信息
	 */
	$scope.goEdit = function(x) {
		$state.go("index.setup.workStoreRelationAdd",{"workId":x.msa_work_id,"mbw_name":x.mbw_name});
	}
	
})