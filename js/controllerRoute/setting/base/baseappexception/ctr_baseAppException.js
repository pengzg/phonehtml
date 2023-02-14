tempApp.controller('ctr_baseAppException', function($scope,
    $state,http,EzConfirm,messageFactory,$rootScope) {

$scope.searchParam = {};
$scope.vo = {};
var format = 'yyyy-MM-dd';
$scope.dateNow = dateRangeUtil.getCurrentMonth(format);
$scope.startdate = $scope.dateNow[0];
$scope.enddate = $scope.dateNow[1];
	
// $("#start_date").val($scope.startdate);
// $("#end_date").val($scope.enddate);
$scope.dialogShow = false;
/**
 * 查询数据
 */
$scope.pager = {page:1,rows:'20',sort:'bae_addtime',order:'desc',pageList:['10','20','30'],otr_shopid:$rootScope.USER.shopId};
var queryDataList = function(){
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
    var url = '/admin/base/baseAppExceptionControl/dataGrid';
    http.post(url,$.extend({}, $scope.pager, $scope.searchParam),success,error);
}




/**
 * 条件查询
 */
$scope.doSearch = function(){
    if($scope.pager.page!=1){
        $scope.pager.page = 1;
    }
    queryDataList();
}




/**
 * 监听
 */
$scope.$watch(function(){
    var newValue = $scope.pager.page+' '+$scope.pager.rows+' '+$scope.pager.sort+' '+$scope.pager.order+' ';
    return newValue;
},queryDataList);

$scope.showContent = function(x) {
    $scope.vo = x;
    $scope.dialogShow = true;
}

$scope.closeDialog = function(){
    $scope.vo = {};
    $scope.dialogShow = false;
}

$scope.clearParams = function(){
    $("#start_date").val($scope.startdate);
    $("#end_date").val($scope.enddate);
    $scope.searchParam.searchKey = '';
}


})