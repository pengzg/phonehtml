tempApp.controller('ctr_csCustomerAlarm', function($scope,
		$state,http,EzConfirm,messageFactory) {
	$scope.pager = {page:1,rows:'10',sort:'cc_last_visiting_date',order:'desc',pageList:['10','20','30']};
	$scope.searchParam = {};
	$scope.vo = {};
	$scope.checkedIds = "";
	$scope.alarmTypeList = [{"bd_code":"1","bd_name":"超期预警"},{"bd_code":"2","bd_name":"拜访提醒"}];
	$scope.compList = [{"bd_code":"1","bd_name":"等于"},{"bd_code":"2","bd_name":"大于"},{"bd_code":"3","bd_name":"大于等于"},{"bd_code":"4","bd_name":"小于"},{"bd_code":"5","bd_name":"小于等于"}];
	$scope.comName = "等于";
	$scope.searchParam.comp_type = 1;
	$scope.typeName="超期天数";
	$scope.searchParam.alarm_type = 1;
	$scope.searchParam.cc_stats = 1;
	$scope.saleName = "全部";
	
	/**
	 * 查询数据
	 */
	$scope.getList = function(){
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
		var url = '/admin/customer/csCustomerControl/dataGridAlarm.action';
		http.post(url,$.extend({}, $scope.pager, $scope.searchParam),success,error);
	}
	
	/**
	 * 显示添加div
	 */
	$scope.showDialog = function(){
		$scope.dialogShow = true;
	}
	
	/**
	 * 关闭添加div
	 */
	$scope.closeDialog = function(){
		$scope.dialogShow = false;
	}
	
	/**
	 * 点击ztree
	 */
	$scope.selectCategory = function(){
		// console.log($scope.selectNode);
		$scope.searchParam.cc_categoryid = $scope.selectNode.id;
		$scope.getList();
	}
		
	$scope.searchFun = function(){
		
		
		if($scope.pager.page==1){
			$scope.getList();
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
	
	$scope.showSelectChannel = function(){
		$scope.showBox = true;
	}
	

	$scope.cancleBtnClick = function() {
		$scope.showBox = false;
		
	}
	
	// 得到路线列表
	$scope.getBaseLineList = function(){
		var success = function(result){
			$scope.baseLineList = result.data;
		}
		
		var url = "/admin/base/baseLineControl/queryBaseLineItem.action";
		http.post(url,{},success,null);
	}	
	$scope.getBaseLineList();

	/**
	 * 监听
	 */
	$scope.$watch(function(){
		var newValue = $scope.pager.page+' '+$scope.pager.rows+' '+$scope.pager.sort+' '+$scope.pager.order+' ';
		
		return newValue;
	},$scope.getList);
	
	// 选择类型
	$scope.chooseType = function(x){
		$scope.searchParam.alarm_type =x.bd_code;
		$scope.typeName =x.bd_name;
		$scope.getList();
	}
	// 选择标签
	$scope.tabSelect = function(index) {
		
		$scope.tab = index;
		$scope.searchParam.alarm_type = index;
		$scope.searchParam.days ="";
		$scope.getList();
	}
	// 选择比较
	$scope.chooseComp= function(x){
		$scope.searchParam.comp_type = x.bd_code;
		$scope.comName = x.bd_name;
	}
	
	/**
	 * 获取业务员列表
	 */
	$scope.getUserList = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.userList = result.data;
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		}
		var url = '/admin/base/baseUserdocControl/queryBaseUserdoc.action';
		http.post(url,null,success,error);
	}
	
	// 选择业务员
	$scope.chooseSaleman = function(x){
		$scope.saleName = x.bud_name;
		// $scope.searchParam.cc_salesmanid = x.su_id;
		$scope.searchParam.clu_userid = x.su_id;
	}
	
	$scope.deleteSaleman = function(){
		$scope.saleName = "全部";
		// $scope.searchParam.cc_salesmanid = "";
		$scope.searchParam.clu_userid = "";
	}
	$scope.getUserList();
})