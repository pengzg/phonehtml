//tempApp.controller('ctr_productList', function($scope,EzConfirm) {
tempApp.controller('ctr_productType', function($scope,EzConfirm,messageFactory,http,$state,$rootScope,$stateParams) {
   
    $scope.searchParam = {};
	
	/**
	 * 查询列表
	 */
	$scope.pager = {page:1,rows:'10',sort:'pt_id',order:'desc',pageList:['10','20','30'], "shopid":$rootScope.USER.shopId};
	$scope.queryProductTypeList = function(){
		var success = function(result){
			$scope.productTypeList = result.data.rows;
			$scope.pager.total = result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		}
		$scope.searchParam.pt_dr=1;
		$scope.searchParam.pt_state=1;
		var url = '/admin/product/productTypeControl/dataGrid.action';
		http.post(url,$.extend({},$scope.pager,$scope.searchParam),success,error);
	}
    
	/**
	 * 查询
	 */
	$scope.searchFun = function(){
		if($scope.pager.page==1){
			$scope.queryProductTypeList()
		}else{
			$scope.pager.page = 1;
		}
	}
    
	/**
	 * 监听
	 */
	$scope.$watch(function(){
		var newValue = $scope.pager.page+' '+$scope.pager.rows+' '+$scope.pager.sort+' '+$scope.pager.order+' ';
		for(var x in $scope.searchParam){
			newValue = newValue + x+'='+$scope.searchParam[x]+'&';
		}
		return newValue;
	},$scope.queryProductTypeList);
	
	
	$scope.productAdd = function(x){
		switch (x.pt_id)
		{
		case '1010': //水票
			$state.go("index.product.goodsAdd",{pt_id:x.pt_id});
			break;
		case '1011':// 实物
			$state.go("index.product.goodsAdd",{pt_id:x.pt_id});
			break;
		case '1012':// 实物+水票
			$state.go("index.product.goodsAdd",{pt_id:x.pt_id});
			break;
		case '1013':// 储值卡
			$state.go("index.product.rechargeAdd",{pt_id:x.pt_id});
			break;
		
		case '1002'://微信红包(代发)
			$state.go("index.product.productRedAdd");
			break;
		case '1005'://话费
			break;
		case '1003':// 小额红包
			break;
		default:
			break;
		}
			
	}
})