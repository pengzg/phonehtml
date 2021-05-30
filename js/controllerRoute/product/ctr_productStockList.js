tempApp.controller('ctr_productStockList', function($scope,EzConfirm,messageFactory,http,$state,$stateParams,$rootScope) {
	
	$scope.searchParam = {};
	if ($stateParams.searchKey != undefined) {
		$scope.searchParam.searchKey = $stateParams.searchKey;
	}
	
	/**
	 * 查询列表
	 */
	$scope.pager = {page:1,rows:'20',sort:'pss_ts',order:'desc',pageList:['10','20','30'],pss_shopid:$rootScope.USER.shopId};
	$scope.queryProductList = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.productList = result.data.rows;
			$scope.pager.total = result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		}
		var url = '/admin/stock/productStockStoreControl/dataGrid.action';
		http.post(url,$.extend({"pss_dr":1},$scope.pager,$scope.searchParam),success,error);
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
			$scope.storeList.unshift({'bs_id':'','bs_name':'请选择仓库'});
		}
		var error = function(){
			
		}
		var url = "/admin/base/baseStorehouseControl/queryItemList.action";
		http.post(url,{bs_shopid:$rootScope.USER.shopId},success,error);
	}
	$scope.getStoreHouse();
	

	
	/**
	 * 监听
	 */
	$scope.$watch(function(){
		var newValue = $scope.pager.page+' '+$scope.pager.rows+' '+$scope.pager.sort+' '+$scope.pager.order+' ';
		
		return newValue;
	},$scope.queryProductList);

	$scope.clearParams = function(){
		$scope.searchParam.searchKey = "";
		$scope.searchParam.pss_storeid = "";

	}


})