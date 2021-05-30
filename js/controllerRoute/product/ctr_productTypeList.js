//tempApp.controller('ctr_productList', function($scope,EzConfirm) {
tempApp.controller('ctr_productTypeList', function($scope,EzConfirm,messageFactory,http,$state,$stateParams) {
   
    $scope.searchParam = {};
	
	/**
	 * 查询列表
	 */
	$scope.pager = {page:1,rows:'10',sort:'pt_id',order:'desc',pageList:['10','20','30']};
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
	
	
})