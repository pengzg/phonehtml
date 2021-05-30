tempApp.controller('ctr_glProfit', function($scope,
    $state,$stateParams,http,EzConfirm,messageFactory,$rootScope) {
$scope.pager = {page:1,rows:'20',sort:'gp_ts',order:'desc',pageList:['10','20','30'],gp_shopid:$rootScope.USER.shopId};
$scope.searchParam = {};
$scope.vo = {};
if($stateParams){
    $scope.searchParam = angular.copy($stateParams);
}
$scope.tab  = 1;
$scope.searchParam.gp_agent_type = 1;
$scope.searchParam.searchKey = "";
/*
 * 查询数据
 */
var queryList = function(){
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
    var url = '/admin/gl/glProfitControl/dataGrid.action';
    http.post(url,$.extend({}, $scope.pager, $scope.searchParam),success,error);
}

/**
 * 条件查询
 */
$scope.doSearch = function(){
    $scope.searchParam.startDate = $("#start_date").val();
    $scope.searchParam.endDate = $("#end_date").val();
    if($scope.pager.page!=1){
        $scope.pager.page = 1;
    }
    queryList();
}

$scope.searchFun = function(){
    $scope.searchParam.startDate = $("#start_date").val();
    $scope.searchParam.endDate = $("#end_date").val();
    if($scope.pager.page==1){
        queryList();
    }else{
        $scope.pager.page = 1;
    }
}

$scope.clearParams = function(){
    $("#start_date").val($scope.startdate);
    $("#end_date").val($scope.enddate);
    $scope.searchParam.searchKey = '';
    $scope.searchParam.tv_ticketid='';
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

   $scope.selectTab = function(x) {
       $scope.tab  = x;
       $scope.pager.page = 1;
       $scope.searchParam.gp_agent_type = x;
       $scope.searchParam.searchKey = "";
       $scope.searchParam.startDate = "";
       $scope.searchParam.endDate = "";
       $scope.searchFun();
   }


    /**
     * 导出
     */
    $scope.doExport = function(){
        var str = "gl_shopid="+$rootScope.USER.shopId;
          str += "&startDate="+$('#start_date').val();
          str += "&endDate="+$('#end_date').val();
          str += "&gp_agent_type="+$scope.searchParam.gp_agent_type;
         
          str += "&searchKey="+$scope.searchParam.searchKey;

		var url = '/admin/gl/glProfitControl/doExportGlProfit.action?'+str;
		window.location.href = url;
    } 
})