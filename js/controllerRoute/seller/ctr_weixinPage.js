tempApp.controller('ctr_weixinPage', function($scope,EzConfirm,messageFactory,http,$state) {
    $scope.pager = {page:1,rows:'10',sort:'wsp_addtime',order:'desc',pageList:['10','20','30']};
    $scope.searchParam = {};
    $scope.vo = {};
    
	/**
	 * 查询列表
	 */
	$scope.queryList = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.msList = result.data.rows;
			$scope.pager.total=result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		var url = '/admin/base/weixinShakePageControl/dataGrid.action';
		http.post(url,$.extend({'wsp_dr':1},$scope.pager,$scope.searchParam),success,error);
	};
    
	/**
	 * 查询
	 */
	$scope.searchFun = function(){
		if($scope.pager.page==1){
			$scope.queryList();
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
	},$scope.queryList);
	
	
	
	/**
	 * 编辑弹框
	 */
	$scope.edit = function(id){
		if(id == undefined || id == ''){
			$state.go('index.seller.weixinPageAdd',{'wsp_id':''});
		}else{
			$state.go('index.seller.weixinPageAdd',{'wsp_id':id});
		}
	}
	
	
	/**
	 * 删除
	 */
	$scope.toDelete = function(id){
		messageFactory.showLoading();
		var success = function(result){
			messageFactory.showMessage('success',result.desc);
			messageFactory.closeLoading();
			$scope.queryList();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		};
		var url = '/admin/base/weixinShakePageControl/delete.action';
		http.post(url,{'wsp_id':id},success,error);
		/*EzConfirm.create({
			heading : '提示',
			text : '删除分组后,原有设备的分组会被清空，确定要操作吗？'
		}).then(function() {
			http.post(url,data,success,error);
		}, function() {

		});*/
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})