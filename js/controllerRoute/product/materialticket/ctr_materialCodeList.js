tempApp.controller('ctr_materialCodeList', function($scope,
    $state,http,EzConfirm,messageFactory,$rootScope,dateUtil) {
$scope.pager = {page:1,rows:'20',sort:'mtc_add_time ',order:'desc',pageList:['10','20','30'],mtc_shopid:$rootScope.USER.shopId};
$scope.searchParam = {};
$scope.vo = {};

/**
 * 查询数据
 */
var queryTicket = function(){
    $scope.searchParam.startDate = $("#start_date").val();
	$scope.searchParam.endDate = $("#end_date").val();
    messageFactory.showLoading();
    var success = function(result){
        $scope.ticketList = result.data.rows;
        $scope.pager.total=result.data.total;
        $scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
        messageFactory.closeLoading();
    }
    var error = function(result){
        messageFactory.closeLoading();
    }
    var url = '/admin/ticket/materialTicketCodeControl/dataGrid.action';
    http.post(url,$.extend({}, $scope.pager, $scope.searchParam),success,error);
}

/**
 * 条件查询
 */
$scope.doSearch = function(){
    if($scope.pager.page!=1){
        $scope.pager.page = 1;
    }
    queryTicket();
}

$scope.searchFun = function(){
    if($scope.pager.page==1){
        queryTicket();
    }else{
        $scope.pager.page = 1;
    }
}


/**
 * 排序方法
 */
$scope.sortFun = function(name,flag){
    if(!flag){
        return 'colorCenter noSortCss';
    }
    if($scope.pager.sort==name&&$scope.pager.order=='asc'){
        return 'SortAscCss'
    }
    if($scope.pager.sort==name&&$scope.pager.order=='desc'){
        return 'SortDescCss'
    }
}

/**
 * 点击切换排序
 */
$scope.clickSortFun = function(name){
    if($scope.pager.sort!=name){
        $scope.pager.sort = name;
        $scope.pager.order = 'asc';
    }
    if($scope.pager.sort==name){
        if($scope.pager.order=='asc'){
            $scope.pager.order = 'desc';
        }else{
            $scope.pager.order = 'asc';
        }
    }
}





    /**
     * 监听
     */
    $scope.$watch(function(){
        var newValue = $scope.pager.page+' '+$scope.pager.rows+' '+$scope.pager.sort+' '+$scope.pager.order+' ';
        return newValue;
    },queryTicket);

    $scope.goAdd = function(){
        $state.go("index.product.materialticketadd");
    }

    $scope.clearInput = function(){
        $scope.searchParam= {};
        $("#start_date").val('');
        $("#end_date").val('');
    }

    $scope.goProductList = function(x){
        $state.go("index.product.materialproductlist",{"mtc_id":x.mtc_id});
    }
    /**
     * 导出
     */
    $scope.doExport = function(x){
		/* var success = function(result){
			
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		} */
		//var url = '/admin/ticket/materialTicketControl/doDetailExport.action';
		var url = '/admin/ticket/materialTicketControl/doDetailExport.action?mt_mtc_id='+x.mtc_id+"&mtc_type="+x.mtc_type+"&mtc_title="+x.mtc_title;
		window.location.href = url;
		//http.post(url,{mt_mtc_id:x.mtc_id, mtc_type:x.mtc_type, "mtc_title":x.mtc_title},success,error);
    }
    // 编辑
    $scope.goEdit = function(x) {
        $state.go("index.product.materialticketadd", {"mtc_id":x.mtc_id});
    }

})