tempApp.controller('ctr_applyMemberList', ['$scope','dateUtil','messageFactory','http','$state','EzConfirm','$stateParams',
function($scope,dateUtil,messageFactory,http,$state,EzConfirm,$stateParams) {

	$scope.today = dateUtil.getDate2();
	$scope.showType = 1;//1:发布 2：暂存 3：取消发布

	$scope.showInForm = true;// true:表格显示 false: 块状显示
	$scope.searchParam = {"pam_apply_state":""};
	$scope.checkBox = false;
	$scope.content = "";
	$scope.vo  = {};
	if ($stateParams.pa_id != undefined) {
		$scope.searchParam.pam_applyid = $stateParams.pa_id;
		$scope.pa_id = $stateParams.pa_id;
    }
	
	
	/**
	 * 查询列表
	 */
	$scope.pager = {page:1,rows:'20',sort:'pam_addtime',order:'desc',pageList:['10','20','30']};
	var queryList = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.pamList = result.data.rows;
			$scope.pager.total=result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		$scope.searchParam.startDate = $("#start_date").val();
		$scope.searchParam.endDate = $("#end_date").val();
		
		var url = '/admin/apply/promotionApplyMemberControl/dataGrid.action';
		http.post(url,$.extend({},$scope.pager,$scope.searchParam),success,error);
	}
	
	
	/**
	 * 监听
	 */
	$scope.$watch(function(){
		var newValue = $scope.pager.page+' '+$scope.pager.rows+' '+$scope.pager.sort+' '+$scope.pager.order+' ';
		
		return newValue;
	},queryList);

	
	$scope.searchFun = function() {
		if($scope.pager.page==1){
			queryList();
		}else{
			$scope.pager.page = 1;
		}
	}
	
	
	$scope.goBack = function(){
		history.back();
	}
	
	/**
	 * 修改状态
	 */
	$scope.updateCheckState = function(x, state, $event){
		if (state == 3 && !$scope.content) {
			messageFactory.showMessage('error',"请输入审核意见");
			return false;
		}
		var success = function(result){
			messageFactory.showMessage('success',result.desc);
			$scope.checkBox = false;
			$scope.vo = {};
			$scope.content = "";
			queryList();
		}
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
			return false;
		}
		var url = '/admin/apply/promotionApplyMemberControl/updateCheckState.action';
		var data = {"pam_id":x.pam_id, "pam_apply_state":state, "pam_def1":$scope.content};
		
		EzConfirm.create({
			heading : '提示',
			text : '确认要操作吗？'
		}).then(function() {
			http.post(url,data,success,error);
		}, function() {
			//console.log('取消？')
		});
	}
	
	/**
	 * 修改状态
	 */
	$scope.updateState = function(x, state, $event){
		var success = function(result){
			messageFactory.showMessage('success',result.desc);
			queryList();
		}
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
			return false;
		}
		var url = '/admin/apply/promotionApplyMemberControl/updateState.action';
		var data = {"pam_id":x.pam_id, "pam_state":state};
		
		EzConfirm.create({
			heading : '提示',
			text : '确认要操作吗？'
		}).then(function() {
			http.post(url,data,success,error);
		}, function() {
			//console.log('取消？')
		});
	}

	/**
	 * 显示框 
	 */
	$scope.showCheckBox = function(x,state, $event){
		$scope.checkBox = true;
		$scope.vo = x;
	}
	/**
	 * 关闭
	 */
	$scope.closeDialog = function(){
		$scope.checkBox = false;
		$scope.vo = {};
		$scope.content = "";
	}
}])