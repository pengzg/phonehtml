tempApp.controller('ctr_csFeedbackList', function($scope,
		$state,http,EzConfirm,messageFactory) {
	$scope.pager = {page:1,rows:'10',sort:'cf_addtime',order:'desc',pageList:['10','20','30']};
	$scope.searchParam = {};
	$scope.showTree = 1;
	$scope.vo = {};
	$scope.checkedIds = "";
	$scope.searchParam.cf_process_status = "";
	$scope.ac_showHtml = 0; 
	
	
	/**
	 * 查询数据
	 */
	$scope.queryList = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.feedbackList = result.data.rows;
			$scope.pager.total=result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
		}
		var url = '/admin/customer/csFeedbackControl/dataGrid.action';
		http.post(url,$.extend({}, $scope.pager, $scope.searchParam),success,error);
	}
	$scope.queryList();
	
	// 选择标签
	$scope.tabSelect = function(stats) {
		
		$scope.tab = stats;
		$scope.searchParam.cf_process_status = stats;
		$scope.queryList();
	}
	
	/**
	 * 显示添加div
	 */
	$scope.showDialog = function(){
		$(".js_select").prop("checked",false);
		$scope.dialogShow = true;
	}
	
	/**
	 * 关闭添加div
	 */
	$scope.closeDialog = function(){
		$(".js_select").prop("checked",false);
		$scope.dialogShow = false;
	}
	

	/**
	 * 点击ztree
	 */
	$scope.selectCategory = function(){
		$scope.searchParam.searchAreaid = '';
		$scope.searchParam.cc_goods_gradeid = "";
		$scope.searchParam.cc_categoryid = $scope.selectNode.id;
		
		$scope.queryList();
	}
	
	
	
	/**
	 * 选择区域
	 */
	$scope.selectAreaSearch = function(obj){
		$scope.searchParam.cc_categoryid = '';
		$scope.searchParam.cc_goods_gradeid = "";
		$scope.searchParam.searchAreaid = obj.id;
		$scope.queryList();
	}
	
	$scope.upNode = function(nodeId){
		// console.log(nodeId)
	}
	$scope.downNode = function(nodeId){
		// console.log(nodeId)
	}

	
	/**
	 * 添加编辑得到焦点flag
	 */
	$scope.checkFun = function(name,type){
		if(type=='focus'){
			$scope.myform[name+'_flag']=true;
		}
		if(type=='blur'){
			$scope.myform[name+'_flag']=false;
		}
	}
	

	

	
	// 点击查询
	$scope.searchFun = function(){
		if($scope.pager.page==1){
			$scope.queryList();
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
	 * 点击ztree
	 */
	$scope.selectCategory = function(){
		$scope.searchParam.searchAreaid = '';
		$scope.searchParam.cc_categoryid = $scope.selectNode.id;
		
		$scope.queryList();
	}
	
	/**
	 * 选择区域
	 */
	$scope.selectAreaSearch = function(obj){
		$scope.searchParam.cc_categoryid = '';
		$scope.searchParam.cc_goods_gradeid = "";
		$scope.searchParam.searchAreaid = obj.id;
		$scope.queryList();
	}


	/**
	 * 监听
	 */
	$scope.$watch(function(){
		var newValue = $scope.pager.page+' '+$scope.pager.rows+' '+$scope.pager.sort+' '+$scope.pager.order+' ';
		
		return newValue;
	},$scope.queryList);
	
	$scope.toEdit = function(x){
		$scope.ac_showHtml =2;
		$scope.vo = x;
	}

	$scope.reply = function(){
		$scope.note = $(".note").val();
		if ($scope.note == '') {
			messageFactory.showMessage('error',"请输入回复内容");
			return;
		}
		
		var success = function(result){
			messageFactory.showMessage('success',"操作成功");
			$scope.vo = {};
			$scope.ac_showHtml = 0;
			$(".note").val("");
			$scope.note = '';
			$scope.queryList();
		}
		var error = function(result){
			messageFactory.showMessage('error',"操作失败");
		}
		
		var data ={'cf_id':$scope.vo.cf_id, "cf_process_note":$scope.note}
		var url = "/admin/customer/csFeedbackControl/updateNote.action";
		var	msg = '您确定回复吗？';
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {			
			http.post(url, data, success, error);
		}, function() {

		});
		
	}
	
	$scope.closeBox = function(){
		$scope.vo = {};
		$scope.ac_showHtml = 0;
		$scope.note = '';
		$(".note").val("");
	}
	
})