tempApp.controller('ctr_promotionApplyList', ['$scope','dateUtil','messageFactory','http','$state','EzConfirm','activityFactory',
function($scope,dateUtil,messageFactory,http,$state,EzConfirm,activityFactory) {

	$scope.today = dateUtil.getDate2();
	$scope.showType = 1;//1:发布 2：暂存 3：取消发布

	$scope.showInForm = true;// true:表格显示 false: 块状显示
	$scope.searchParam = {"pa_state":""};
	
	/**
	 * 查询列表
	 */
	$scope.pager = {page:1,rows:'20',sort:'pa_sort',order:'desc',pageList:['10','20','30']};
	var queryList = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.paList = result.data.rows;
			$scope.pager.total=result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		$scope.searchParam.pa_dr = 1;
		var url = '/admin/apply/promotionApplyControl/dataGrid.action';
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
	//type 1 详情 2 复制 
	$scope.goDetail = function(x,type) {
		var url = "";
		if (type ==1) {
			url = $state.href("index.marketing.promotionApplyDetail",{"pa_id":x.pa_id});
		} else if(type ==2) {
			url = $state.href("index.marketing.promotionApplyEdit",{"pa_id":x.pa_id});
		} else if (type ==4) {
			url = $state.href("index.marketing.applyMemberList",{"pa_id":x.pa_id});
			// $state.go("index.marketing.applyMemberList",{"pa_id":x.pa_id});
		}
		
		window.open(url,'_blank');
	}

	
	$scope.goBack = function(){
		history.back();
	}
	
	/**
	 * 修改状态
	 */
	$scope.updatePublish = function(x, state, $event){
		var success = function(result){
			messageFactory.showMessage('success',result.desc);
			queryList();
		}
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
			return false;
		}
		var url = '/admin/apply/promotionApplyControl/updateState.action';
		var data = {"pa_id":x.pa_id, "pa_state":state};
		
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
	 * 删除
	 */
	$scope.deleteVO = function(x,$event){
		var success = function(result){
			messageFactory.showMessage('success',result.desc);
			queryList();
		}
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
			return false;
		}
		var url = '/admin/apply/promotionApplyControl/delete.action';
		var data = {"pa_id":x.pa_id};
		
		EzConfirm.create({
			heading : '提示',
			text : '确认要操作吗？'
		}).then(function() {
			http.post(url,data,success,error);
		}, function() {
			//console.log('取消？')
		});
	}

}])