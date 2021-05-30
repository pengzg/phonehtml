tempApp.controller('ctr_productTypeAuthority', function($scope,EzConfirm,messageFactory,http,$state,$stateParams,$rootScope) {
    
    $scope.searchParam = {};
	
	/**
	 * 查询列表
	 */
	$scope.pager = {page:1,rows:'20',sort:'pta_date',order:'desc',pageList:['10','20','30'],psr_shopid:$rootScope.USER.shopId};
	$scope.queryRelationList = function(){
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
		var url = '/admin/product/productTypeAuthorityControl/dataGrid.action';
		http.post(url,$.extend({"pta_dr":1},$scope.pager,$scope.searchParam),success,error);
	}
    
	/**
	 * 查询
	 */
	$scope.searchFun = function(){
		if($scope.pager.page==1){
			$scope.queryRelationList();
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
	},$scope.queryRelationList);
	
	/**
	 * 添加页面
	 */
	$scope.addRelation = function(){
		$state.go("index.seller.producttypeauthorityadd");
	}
	
	/**
	 * 删除 
	 */
	$scope.deleteRelation = function(x) {
		var success = function(result){
			messageFactory.showMessage('success',result.desc);
			$scope.queryRelationList();
		}
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
			
		}
		var url = '/admin/product/productTypeAuthorityControl/delete.action';
		var data = {"pta_id":x.pta_id};
		
		EzConfirm.create({
			heading : '提示',
			text : '确认删除吗？'
		}).then(function() {
			http.post(url,data,success,error);
		}, function() {
			//console.log('取消？')
		});
	}

	$scope.clearParams = function(){
		$scope.searchParam.searchKey = "";
		$scope.searchParam.pta_shopid = "";

	}

		/**
	 * 得到经销商列表
	 */
	$scope.pager2 = {"page":1, "rows":100, "sort":"ms_id", "order":"desc"};
    $scope.getShopList = function(){
		var success = function(result){
			$scope.shopList = result.data.rows;
			$scope.shopList.unshift({"ms_id":"", "ms_name":"请选择经销商"});
		}
		var error = function(){
			
		}
		
		var url = "/admin/member/memberShopControl/dataGrid.action";
		http.post(url,$scope.pager2,success,error);
    	
    }
	$scope.getShopList();
	
})