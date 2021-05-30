tempApp.controller('ctr_productStockDetail', function($scope,
    $state,$stateParams,http,EzConfirm,messageFactory,$rootScope) {
$scope.pager = {page:1,rows:'20',sort:'psd_operation_time',order:'desc',pageList:['10','20','30'],psd_shopid:$rootScope.USER.shopId,"psd_dr":1};
$scope.searchParam = {};
$scope.searchParam.searchKey = '';
$scope.searchParam.psd_storeid = '';
$scope.searchParam.psd_sourcetype = '';
$scope.searchParam.psd_stocktype = '';
$scope.searchParam.psd_productid = '';
if ($stateParams.startDate) {
    $scope.searchParam.startDate = $stateParams.startDate;
    $("#start_date").val($scope.searchParam.startDate);
}
if ($stateParams.endDate) {
    $scope.searchParam.endDate = $stateParams.endDate;
    $("#end_date").val($scope.searchParam.endDate);
}
if ($stateParams.psd_productid) {
    $scope.searchParam.psd_productid = $stateParams.psd_productid;
}
if ($stateParams.psd_storeid) {
    $scope.searchParam.psd_storeid = $stateParams.psd_storeid;
}
if ($stateParams.psd_sourcetype) {
    $scope.searchParam.psd_sourcetype = $stateParams.psd_sourcetype;
}
if ($stateParams.psd_stocktype) {
    $scope.searchParam.psd_stocktype = $stateParams.psd_stocktype;
}
if ($stateParams.searchKey) {
    $scope.searchParam.searchKey = $stateParams.searchKey;
}

   
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
    var url = '/admin/stock/productStockDetailControl/dataGrid.action';
    http.post(url,$.extend({}, $scope.pager, $scope.searchParam),success,error);
}


/**
 * 配送方式列表
 */
$scope.sourceTypeList = [];
$scope.querySourceTypeList = function(){
    var success = function(result){
            
            $scope.sourceTypeList = result.data;
            $scope.sourceTypeList.unshift({'bd_code':'','bd_name':'请选择类型'});
        }
        var error = function(result){
            messageFactory.closeLoading();
            messageFactory.showMessage('error',result.desc);
        }
    var url = '/admin/base/baseDataControl/detailItem.action?codekey=2197';
    http.post(url,null,success,error);
}
$scope.querySourceTypeList();

/**
 * 配送方式列表
 */
$scope.stockTypeList = [];
$scope.queryStockTypeList = function(){
    var success = function(result){
            
            $scope.stockTypeList = result.data;
            $scope.stockTypeList.unshift({'bd_code':'','bd_name':'请选择类型'});
        }
        var error = function(result){
            messageFactory.closeLoading();
            messageFactory.showMessage('error',result.desc);
        }
    var url = '/admin/base/baseDataControl/detailItem.action?codekey=2112';
    http.post(url,null,success,error);
}
$scope.queryStockTypeList();

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
    $scope.searchParam.psd_sourcetype = '';
    $scope.searchParam.psd_stocktype = '';
    $scope.searchParam.psd_productid = '';
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
   $scope.goOrderDetail = function(id,code){
       var url = "";
       url = $state.href('index.order.orderDetail',{'om_id':id,'om_order_code':code});
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
        console.log($scope.searchParam.searchKey);
        var str = "psd_shopid="+$rootScope.USER.shopId;
          
          str += "&startDate="+$('#start_date').val();
          str += "&endDate="+$('#end_date').val();    
          str += "&searchKey="+$scope.searchParam.searchKey;
          str += "&psd_storeid="+$scope.searchParam.psd_storeid;
          str += "&psd_sourcetype="+$scope.searchParam.psd_sourcetype;
          str += "&psd_stocktype="+$scope.searchParam.psd_stocktype;
          str += "&psd_productid="+$scope.searchParam.psd_productid;
          
        var url = '/admin/stock/productStockDetailControl/doExportStockDetail.action?'+str;
        window.location.href = url;
    }
})