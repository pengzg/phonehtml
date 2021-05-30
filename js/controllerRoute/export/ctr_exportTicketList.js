tempApp.controller('ctr_exportTicketList', function($scope,
		$state,http,EzConfirm,messageFactory,$rootScope,$stateParams) {
	$scope.pager = {page:1,rows:'20',sort:'tm_add_time',order:'desc',pageList:['10','20','30'],tm_shopid:$rootScope.USER.shopId};
	$scope.pager2 = {page:1,rows:'20',sort:'tv_ts',order:'desc',pageList:['10','20','30'],tv_shopid:$rootScope.USER.shopId};
	$scope.searchParam = {searchKey:"",tm_use_state:"",tm_buy_type:"",tm_memberid:"",tm_def1:""};
	$scope.searchParam2 = {searchKey:"",tv_memberid:""};
	$scope.vo = {};
	$scope.tab = '1';
	var format = 'yyyy-MM-dd';
	$scope.dateNow = dateRangeUtil.getCurrentMonth(format);
	$scope.startdate = $scope.dateNow[0];
	$scope.enddate = $scope.dateNow[1];
	
	
	if ($stateParams.tab) {
		
		$scope.tab = $stateParams.tab;
	}
	if ($stateParams.startDate) {
		if ($scope.tab == '1' ) {
			$("#start_date").val($stateParams.startDate);
		} else {
			$("#start_date_v").val($stateParams.startDate);
		}
		
	}
	if ($stateParams.endDate) {
		if ($scope.tab == '1' ) {
			$("#end_date").val($stateParams.endDate);
		} else {
			$("#end_date_v").val($stateParams.startDate);
		}
	}
	if ($stateParams.memberid) {
		if ($scope.tab == '1' ) {
			$scope.searchParam.tm_memberid = $stateParams.memberid;
		} else {
			$scope.searchParam2.tv_memberid = $stateParams.memberid;
		}
	}
	

	/**
	 * 查询数据
	 */
	$scope.queryTicket = function(){
		if ($scope.tab != '1') {
			return ;
		}
		$scope.searchParam.startDate = $("#start_date").val();
    	$scope.searchParam.endDate = $("#end_date").val();
		$scope.searchParam.outdateStart = $("#outdate_start").val();
    	$scope.searchParam.outdateEnd = $("#outdate_end").val();
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
		var url = '/admin/ticket/ticketMainControl/dataGrid.action';
		http.post(url,$.extend({}, $scope.pager, $scope.searchParam),success,error);
	}
	$scope.queryTicket();
	
	
	$scope.searchFun = function(){
		if($scope.pager.page==1){
			$scope.queryTicket();
		}else{
			$scope.pager.page = 1;
		}
	}
	$scope.goTicketV = function(x){
		$state.go('index.user.ticketVList', {tv_ticketid: x.tm_id});
	}
	
	
	
	
	$scope.queryBuyList = function(){
		$scope.buyList = [];
		var success = function(result){
			 for(var x in result.data){
				var code = result.data[x].bd_code; 
				var name = result.data[x].bd_name;
				var str = {'bd_code':code,'bd_name':name};
				$scope.buyList.push(str);
			 }
			 $scope.buyList.unshift({'bd_code':'','bd_name':"全部类型"});
		  }
		  var error = function(result){
			  messageFactory.closeLoading();
			  messageFactory.showMessage('error',result.desc);
		  }
		var url = '/admin/base/baseDataControl/detailItem.action?codekey=2170';
		http.post(url,null,success,error);
	}
	$scope.queryBuyList();
	
	$scope.queryUseStateList = function(){
		$scope.useStateList = [];
		var success = function(result){
			 for(var x in result.data){
				var code = result.data[x].bd_code; 
				var name = result.data[x].bd_name;
				var str = {'bd_code':code,'bd_name':name};
				$scope.useStateList.push(str);
			 }
			 $scope.useStateList.unshift({'bd_code':'','bd_name':"全部状态"});
		  }
		  var error = function(result){
			  messageFactory.closeLoading();
			  messageFactory.showMessage('error',result.desc);
		  }
		var url = '/admin/base/baseDataControl/detailItem.action?codekey=2171';
		http.post(url,null,success,error);
	}
	$scope.queryUseStateList();
	
	/**
	 * 监听
	 */
	$scope.$watch(function(){
		var newValue = $scope.pager.page+' '+$scope.pager.rows+' '+$scope.pager.sort+' '+$scope.pager.order+' ';
		return newValue;
	},$scope.queryTicket);


	$scope.updateToOutDate = function(x) {
		var success = function (result) {
			messageFactory.showMessage("success", result.desc);
			$scope.searchFun();
		}
		var error = function (result) {
			messageFactory.closeLoading();
			messageFactory.showMessage('error', result.desc);
		}
		var url = "/admin/ticket/ticketMainControl/updateToOutDate.action";
		EzConfirm.create({
			heading: '提示',
			text: "您确定要设定过期这张水票吗？"
		}).then(function () {
			
			http.post(url, {tm_id:x.tm_id}, success, error);
		}, function () {

		});
	}

	$scope.clearParams = function(){
		$("#start_date").val("");
		$("#end_date").val("");
		$("#outdate_start").val();
    	$("#outdate_end").val();
		$scope.searchParam.searchKey = '';
		$scope.searchParam.tm_def1 = '';
		$scope.searchParam.tm_memberid = '';
		$scope.searchFun();
	}

	 /**
     * 导出
     */
    $scope.doExport = function(){
        var str = "tm_shopid="+$rootScope.USER.shopId;
          
          str += "&startDate="+$('#start_date').val();
          str += "&endDate="+$('#end_date').val();
         
          str += "&tm_def1="+$scope.searchParam.tm_def1;
          str += "&tm_use_state="+$scope.searchParam.tm_use_state;
          str += "&tm_memberid="+$scope.searchParam.tm_memberid;
          str += "&tm_buy_type="+$scope.searchParam.tm_buy_type;
          str += "&searchKey="+$scope.searchParam.searchKey;
          str += "&order="+$scope.pager.order;
          str += "&sort="+$scope.pager.sort;
         
		var url = '/admin/ticket/ticketMainControl/doExportTicket.action?'+str;
		window.location.href = url;
	}
	
	$scope.clearParams2 = function(){
		$("#start_date_v").val("");
		$("#end_date_v").val("");
		
		$scope.searchParam2.searchKey = '';
		
		$scope.searchFun2();
	}
	
	

	/**
	 * 查询数据
	 */
	$scope.queryTicketV = function(){
		if ($scope.tab == '1') {
			return ;
		}
		$scope.searchParam2.startDate = $("#start_date_v").val();
		$scope.searchParam2.endDate = $("#end_date_v").val();
		messageFactory.showLoading();
		var success = function(result){
			$scope.ticketVList = result.data.rows;
			$scope.pager2.total=result.data.total;
			$scope.pager2.pageTotal = Math.ceil($scope.pager2.total/$scope.pager2.rows);
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
		}
		var url = '/admin/ticket/ticketVerificationControl/dataGrid.action';
		http.post(url,$.extend({}, $scope.pager2, $scope.searchParam2),success,error);
	}
	
	$scope.searchFun2 = function(){
		if($scope.pager2.page==1){
			$scope.queryTicketV();
		}else{
			$scope.pager2.page = 1;
		}
	}

	/**
	 * 监听
	 */
	$scope.$watch(function(){
		var newValue = $scope.pager2.page+' '+$scope.pager2.rows+' '+$scope.pager2.sort+' '+$scope.pager2.order+' ';
		return newValue;
	},$scope.queryTicketV);


	/**
     * 导出
     */
    $scope.doExportV = function(){
        var str = "tv_shopid="+$rootScope.USER.shopId;
          
          str += "&startDate="+$('#start_date_v').val();
          str += "&endDate="+$('#end_date_v').val();
         
			

          str += "&tv_memberid="+$scope.searchParam2.tv_memberid;
          str += "&searchKey="+$scope.searchParam2.searchKey;
          str += "&order="+$scope.pager2.order;
          str += "&sort="+$scope.pager2.sort;
         
		var url = '/admin/ticket/ticketVerificationControl/doExportTicketV.action?'+str;
		window.location.href = url;
	}
})