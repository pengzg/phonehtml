tempApp.controller('ctr_ticketVList', function($scope,
		$state,$stateParams,http,EzConfirm,messageFactory,$rootScope) {
	$scope.pager = {page:1,rows:'20',sort:'tv_ts',order:'desc',pageList:['10','20','30'],tv_shopid:$rootScope.USER.shopId};
	$scope.searchParam = {};
	$scope.vo = {};
	if($stateParams){
		$scope.searchParam = angular.copy($stateParams);
	}

	if ($stateParams.startDate) {
		$("#start_date").val($stateParams.startDate);
	}
	if ($stateParams.endDate) {
		$("#end_date").val($stateParams.endDate);
	}
	if ($stateParams.memberid) {
		$scope.searchParam.tm_memberid = $stateParams.memberid;
	}
	
	if ($stateParams.tmDef1) {
		$scope.searchParam.tm_def1 = 1;
	}
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
		var url = '/admin/ticket/ticketVerificationControl/dataGrid.action';
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
		$scope.searchParam.startDate = $("#start_date").val();
		$scope.searchParam.endDate = $("#end_date").val();
		if($scope.pager.page==1){
			queryTicket();
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
	
	$scope.goOrder = function(code){
		
	}
	
	/**
	 * 监听
	 */
	$scope.$watch(function(){
		var newValue = $scope.pager.page+' '+$scope.pager.rows+' '+$scope.pager.sort+' '+$scope.pager.order+' ';
		return newValue;
	},queryTicket);
	
})