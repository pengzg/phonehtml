tempApp.controller('ctr_restaurantProduct', function($scope,
    $state,$stateParams,http,EzConfirm,messageFactory,$rootScope) {
$scope.pager = {page:1,rows:'20',sort:'rsp_sort',order:'desc',pageList:['10','20','30'],rsp_shopid:$rootScope.USER.shopId};
$scope.searchParam = {};
$scope.vo = {};
if($stateParams){
    $scope.searchParam = angular.copy($stateParams);
}
/**
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
    var url = '/admin/restaurant/restaurantShopProductControl/dataGrid.action';
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
    * 查询详情
    */
   $scope.goEdit = function(x){
    var url = "";
    url = $state.href('index.product.restaurantProductAdd',{'rsp_id':x.rsp_id});
    window.open(url,'_blank');
}

/**
	 * 启用与禁用
	 */
	$scope.updateState = function(x, state) {
		var success = function(result){
    		messageFactory.closeLoading();
    		messageFactory.showMessage('success',result.desc);
    			queryList();
    	}
    	
    	var error = function(result){
    		messageFactory.showMessage('error',result.desc);
    		messageFactory.closeLoading();
    	}
    	var data = {"rsp_id":x.rsp_id,"rsp_state":state};
		var url = "/admin/restaurant/restaurantShopProductControl/updateState.action" ;
		
		var msg = '您确定要禁用吗？';
		if (state ==1) {
			msg = '您确定要启用吗？';
		}
		
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {
			messageFactory.showLoading();
			http.post(url, data, success, error);
		}, function() {

		});
		
    }
    
    $scope.stateList = [];
	$scope.queryStateList = function(){
	  var success = function(result){
		$scope.stateList = result.data;
		$scope.stateList.unshift({"bd_code":"", "bd_name":"全部"});
	}
	  var error = function(result){
		  messageFactory.closeLoading();
		  messageFactory.showMessage('error',result.desc);
	  }
	  var url = '/admin/base/baseDataControl/detailItem.action?codekey=2006';
	  http.post(url,null,success,error);
	}
	$scope.queryStateList();
})