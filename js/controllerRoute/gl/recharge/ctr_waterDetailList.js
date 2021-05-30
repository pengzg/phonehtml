tempApp.controller('ctr_waterDetailList', function($scope, $rootScope, $location,
    $state,$timeout,http,$stateParams,EzConfirm,$compile,dateUtil,messageFactory,sessionFactory) {
$scope.pager = {page:1,rows:'20',sort:'mwd_time',order:'DESC',pageList:['10','20','30']};
$scope.searchParam = {};
$scope.searchParam.startDate = dateUtil.getDate2();
$scope.searchParam.endDate = dateUtil.getDate2();
$("#start_date").val($scope.searchParam.startDate);
$("#end_date").val($scope.searchParam.endDate);
$scope.erpMainInfo = {};
$scope.dialog = 0;

$scope.tab = "1";
$scope.searchParam.mbd_source_type  = "1";
/**ctr_stockInList
 * 查询列表
 */
var queryList = function(){
    
    messageFactory.showLoading();
    $scope.searchParam.startDate = $("#start_date").val();
    $scope.searchParam.endDate = $("#end_date").val();
    var success = function(result){
        $scope.dataList = result.data.rows;
        $scope.pager.total=result.data.total;
        $scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
        messageFactory.closeLoading();
    };
    var error = function(result){
        messageFactory.closeLoading();
        messageFactory.showMessage('error',result.desc);
        
    };
    var url = '/admin/account/memberWaterDetailedControl/dataGrid.action';
    http.post(url,$.extend({},$scope.pager,$scope.searchParam),success,error);
};




/**
 * 查询
 */
$scope.searchFun = function(){
    
    if($scope.pager.page==1){
        queryList();
    }else{
        $scope.pager.page = 1;
    }
}






/**
 * 监听
 */
$scope.$watch(function(){
    var newValue = $scope.pager.page+' '+$scope.pager.rows+' '+$scope.pager.sort+' '+$scope.pager.order+' ';
    return newValue;
},queryList);



$scope.closeDialog = function(){
    $scope.dialog = 0;
}



$scope.clearParams = function(){
    $('#start_date').val(dateUtil.getDate2());
    $('#end_date').val(dateUtil.getDate2());
    $scope.searchParam.searchKey = "";
}

		/**
	 * 查询明细类型列表
	 */
	$scope.typeList = [];
	$scope.queryTypeList = function(){
		var success = function(result){
			 for(var x in result.data){
				var code = result.data[x].bd_code; 
				var name = result.data[x].bd_name;
				var str = {'bd_code':code,'bd_name':name};
				$scope.typeList.push(str);
			 }
			 $scope.typeList.unshift({'bd_code':'','bd_name':"全部"});
		  }
		  var error = function(result){
			  messageFactory.closeLoading();
			  messageFactory.showMessage('error',result.desc);
		  }
		var url = '/admin/base/baseDataControl/detailItem.action?codekey=2160';
		http.post(url,null,success,error);
	}
    $scope.queryTypeList();
    
    $scope.selectTab = function(x) {
		$scope.tab  = x;
		$scope.pager.page = 1;
		$scope.searchParam.mbd_source_type = x;
		$scope.searchParam.searchKey = "";
		$scope.searchParam.startDate = "";
		$scope.searchParam.endDate = "";
		$scope.searchFun();
	}
})