tempApp.controller('ctr_productStoreRelation', function($scope,EzConfirm,messageFactory,http,$state,$stateParams,$rootScope) {
    
    $scope.searchParam = {};
    var format = 'yyyy-MM-dd';
	
	$scope.searchParam.psr_dr = 1;
	
	
	/**
	 * 查询列表
	 */
	$scope.pager = {page:1,rows:'20',sort:'psr_ts',order:'desc',pageList:['10','20','30'],psr_shopid:$rootScope.USER.shopId};
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
		var url = '/admin/product/productStoreRelationControl/dataGrid.action';
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
	 * 查询仓库
	 */
	$scope.getStoreHouse = function(){
		var success = function(result){
			$scope.storeList = result.data;
			for (i in $scope.storeList) {
				$scope.storeList[i].bs_name = $scope.storeList[i].bs_name+"("+$scope.storeList[i].bs_code+")";
			}
			$scope.storeList.unshift({'bs_id':'','bs_name':'请选择柜子'});
		}
		var error = function(){
			
		}
		
		var url = "/admin/base/baseStorehouseControl/queryItemList.action";
		http.post(url,{"bs_type":"4",bs_shopid:$rootScope.USER.shopId},success,error);
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
		$state.go("index.product.productStoreRelationAdd");
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
		var url = '/admin/product/productStoreRelationControl/delete.action';
		var data = {"psr_id":x.psr_id};
		
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
		$scope.searchParam.psr_storeid = "";

	}
	
})