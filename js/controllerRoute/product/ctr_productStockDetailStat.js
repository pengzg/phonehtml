tempApp.controller('ctr_productStockDetailStat', function($scope,
    $state,$stateParams,http,EzConfirm,messageFactory,$rootScope) {
$scope.pager = {page:1,rows:'20',sort:'',order:'desc',pageList:['10','20','30'],psd_shopid:$rootScope.USER.shopId};
$scope.searchParam = {searchKey:"","psd_storeid":""};
var format = 'yyyy-MM-dd';
$scope.dateNow = dateRangeUtil.getCurrentMonth(format);
$scope.startdate = $scope.dateNow[0];
$scope.enddate = $scope.dateNow[1];
/**
 * 查询数据
 */
var queryList = function(){
    $scope.searchParam.startDate = $("#start_date").val();
    $scope.searchParam.endDate = $("#end_date").val();
    messageFactory.showLoading();
    var success = function(result){
        $scope.dataList = result.data.rows;
        $scope.pager.total=result.data.total;
        $scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
        messageFactory.closeLoading();
    }
    var error = function(result){
        messageFactory.closeLoading();
    }
    var url = '/admin/stock/productStockDetailControl/dataGridStat.action';
    http.post(url,$.extend({}, $scope.pager, $scope.searchParam),success,error);
}

/**
 * 条件查询
 */
$scope.doSearch = function(){

    if($scope.pager.page!=1){
        $scope.pager.page = 1;
    }
    queryList();
}


$scope.clearParams = function(){
    $("#start_date").val("");
    $("#end_date").val("");
    $scope.searchParam.searchKey = '';
    $scope.searchParam.psd_storeid = '';
    $scope.doSearch();
}






    /**
     * 监听
     */
    $scope.$watch(function(){
        var newValue = $scope.pager.page+' '+$scope.pager.rows+' '+$scope.pager.sort+' '+$scope.pager.order+' ';
        return newValue;
    },queryList);

    /*
    * 查询订单详情
    */
   $scope.goPsdDetail = function(x,sourcetype,stocktype){
       var url = "";
       url = $state.href('index.product.productstockdetail',{'startDate':$scope.searchParam.startDate,'endDate':$scope.searchParam.endDate,'psd_productid':x.psd_productid,'psd_storeid':x.psd_storeid,'psd_sourcetype':sourcetype,'psd_stocktype':stocktype,"searchKey":$scope.searchParam.searchKey});
       window.open(url,'_blank');
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
    

    $scope.doExport = function(){
        var str = "psd_shopid="+$rootScope.USER.shopId;
          
          str += "&startDate="+$('#start_date').val();
          str += "&endDate="+$('#end_date').val();
        
          str += "&searchKey="+$scope.searchParam.searchKey ;
          str += "&psd_storeid="+$scope.searchParam.psd_storeid ;
          
        var url = '/admin/stock/productStockDetailControl/doExportStat.action?'+str;
        window.location.href = url;
    }
})