tempApp.controller('ctr_focus', function($scope,$stateParams,$state,http,EzConfirm,messageFactory,dateUtil,$timeout,$rootScope) {
	$scope.pager = {page:1,rows:'20',sort:'fb_sort Desc,fb_addtime',order:' DESC',pageList:['10','20','30'],fb_shopid:$rootScope.USER.shopId};
	$scope.checkstateList = [{"id":"","name":"全部"},{"id":1,"name":"审核中"},{"id":2,"name":"审核通过"},{"id":3,"name":"审核不通过"}];
	$scope.typeList = [{"id":"","name":"全部"},{"id":2,"name":"图片"},{"id":1,"name":"视频"}];
	// $scope.locationList = [{"id":"","name":"全部"},{"id":1,"name":"小程序banner"},{"id":2,"name":"活动"},{"id":3,"name":"柜子大屏"},{"id":4,"name":"屏保"}];
	$scope.stateList = [{"id":"","name":"全部"},{"id":1,"name":"启用"},{"id":0,"name":"禁用"}];
	$scope.searchParam = {};
	$scope.vo = {};
	$scope.dateNow = dateUtil.getDate2();
	/*$scope.searchParam.start_date = $scope.dateNow;
	$scope.searchParam.end_date = $scope.dateNow;
	$('#start_date').val($scope.dateNow);
	$('#end_date').val($scope.dateNow);*/
	$scope.checkBoxShow = false;

	
	/**
	 * 查询数据
	 */
	var queryList = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.logList = result.data.rows;
			$scope.pager.total=result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
		}
		var url = '/admin/base/focusBaseControl/dataGrid.action';
		http.post(url,$.extend({}, $scope.pager, $scope.searchParam),success,error);
	}

	/**
	 * 显示位置列表
	 */
	$scope.locationList = [];
	$scope.queryLocationList = function(){
	  var success = function(result){
		$scope.locationList = result.data;
		// $scope.payWayList = [{"bd_code":"1", "bd_name":"线上支付"},{"bd_code":"2", "bd_name":"线下支付"}];
		$scope.locationList.unshift({"bd_code":"", "bd_name":"全部"});
	}
	  var error = function(result){
		  messageFactory.closeLoading();
		  messageFactory.showMessage('error',result.desc);
	  }
	  var url = '/admin/base/baseDataControl/detailItem.action?codekey=1051';
	  http.post(url,null,success,error);
	}
	$scope.queryLocationList();
	
	/**
	 * 条件查询
	 */
	
	$scope.searchFun = function(){
		/*$scope.searchParam.start_date = $('#start_date').val();
		$scope.searchParam.end_date = $('#end_date').val();*/
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
	
	// 清除数据
	$scope.clearParams = function(){
		$scope.searchParam.searchKey='';
		$scope.searchParam.fb_location='';
		$scope.searchParam.fb_type='';
		$scope.searchParam.fb_checkstate='';
		$scope.searchParam.fb_state='';
		$('#start_date').val($scope.dateNow);
		$('#end_date').val($scope.dateNow);
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
    	var data = {"fb_id":x.fb_id,"fb_state":state};
		var url = "/admin/base/focusBaseControl/updateState.action" ;
		
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
	
	/**
	 * 编辑
	 */
	$scope.goEdit = function(x){
		var url = "";
		url = $state.href("index.setup.focusAdd",{"fb_id":x.fb_id});
		window.open(url, "_blank");
	}
	
	/**
	 * 显示审核框
	 */
	$scope.showCheckBox = function(x) {
		$scope.vo = x;
		$scope.checkBoxShow = true;
	}
	
	/**
	 * 审核
	 */
	$scope.updateCheckstate = function(checkstate) {
		
		if (checkstate == 3 && !$("#comment").val()) {
			messageFactory.showMessage('error',"请输入审核意见");
			return false;
		}
		var success = function(result){
			$scope.checkBoxShow = false;
    		messageFactory.closeLoading();
    		messageFactory.showMessage('success',result.desc);
    			queryList();
    	}
    	
    	var error = function(result){
    		messageFactory.showMessage('error',result.desc);
    		messageFactory.closeLoading();
    	}
    	var data = {"fb_id":$scope.vo.fb_id,"fb_checkstate":checkstate,"fb_checkcomment": $("#comment").val()};
		var url = "/admin/base/focusBaseControl/updateCheckstate.action" ;
		
		var msg = '您确定要审核通过吗？';
		if (checkstate ==3) {
			msg = '您确定要审核不通过吗？';
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

	$scope.clearParams = function(){
		$scope.searchParam = {};
	}
	
})