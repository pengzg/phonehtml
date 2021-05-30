tempApp.controller('ctr_exportMemberGiftList', function($scope,
    $state,$stateParams,http,EzConfirm,messageFactory,$rootScope) {
$scope.pager = {page:1,rows:'20',sort:'mg_ts',order:'desc',pageList:['10','20','30'],mg_shopid:$rootScope.USER.shopId};
$scope.searchParam = {};
var format = 'yyyy-MM-dd';
$scope.dateNow = dateRangeUtil.getCurrentMonth(format);
$scope.startdate = $scope.dateNow[0];
$scope.enddate = $scope.dateNow[1];
$scope.searchParam.searchKey = "";
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
    var url = '/admin/member/memberGiftControl/dataGrid.action';
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
     * 导出
     */
    $scope.doExport = function(){
        var str = "mg_shopid="+$rootScope.USER.shopId;
          
          str += "&startDate="+$('#start_date').val();
          str += "&endDate="+$('#end_date').val();
         
          str += "&searchKey="+$scope.searchParam.searchKey;
          str += "&order="+$scope.pager.order;
          str += "&sort="+$scope.pager.sort;
         
		var url = '/admin/member/memberGiftControl/doExportTicketsend.action?'+str;
		window.location.href = url;
    }
})