tempApp.controller('ctr_glBill', function($scope, $rootScope, http, messageFactory, $state, $stateParams, EzConfirm,dateUtil,$rootScope) {

    $scope.dialog = 0;

    $scope.showDialog = function(x) {
        $scope.dialog = 1;
    }
    $scope.closeDialog = function(){
        $scope.dialog = 0;
    }

    $scope.goDetail = function(){
        var url = "";
        url = $state.href('index.gl.glbilldetail',{});
        window.open(url,'_blank');
    }
    
    $scope.pager = {page:1,rows:'20',sort:'grb_ts',order:'desc',pageList:['10','20','30'],grb_shopid:$rootScope.USER.shopId};
    $scope.searchParam = {};
    var format = 'yyyy-MM-dd';
	$scope.dateNow = dateRangeUtil.getCurrentMonth(format);
	$scope.searchParam.startDate = $scope.dateNow[0];
	$scope.searchParam.endDate = $scope.dateNow[1];
	$("#start_date").val($scope.searchParam.startDate);
	$("#end_date").val($scope.searchParam.endDate);
    
    /**
	 * 查询数据
	 */
	var queryGlbill = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.billList = result.data.rows;
			$scope.pager.total=result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
		}
		
		var url = '/admin/gl/glReceiptBillControl/dataGrid.action';
		http.post(url,$.extend({}, $scope.pager, $scope.searchParam),success,error);
	}
	
	/**
	 * 条件查询
	 */
	$scope.doSearch = function(){
		$scope.searchParam.searchKey = $scope.searchKey;
		if($scope.pager.page!=1){
			$scope.pager.page = 1;
		}
		queryBaseStorehouse();
	}
	
	$scope.searchFun = function(){
		$scope.searchParam.startDate = $("#start_date").val();
		$scope.searchParam.endDate = $("#end_date").val();
		if($scope.pager.page==1){
			queryGlbill();
		}else{
			$scope.pager.page = 1;
		}
	}
	
	/**
	 * 监听
	 */
	$scope.$watch(function(){
		var newValue = $scope.pager.page+' '+$scope.pager.rows+' '+$scope.pager.sort+' '+$scope.pager.order+' ';
		/*for(var x in $scope.searchParam){
			newValue = newValue + x+'='+$scope.searchParam[x]+'&';
		}*/
		return newValue;
	},queryGlbill);

})