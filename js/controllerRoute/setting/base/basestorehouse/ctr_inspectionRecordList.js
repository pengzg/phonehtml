tempApp.controller('ctr_inspectionRecordList', function($scope,
		$state,http,EzConfirm,messageFactory,$rootScope) {
	$scope.pager = {page:1,rows:'20',sort:'ir_id',order:'desc',pageList:['10','20','30'], "ir_shopid":$rootScope.USER.shopId};
	$scope.searchParam = {};
	
	/**
	 * 查询数据
	 */
	var queryInspectionRecord = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.inspectionRecordList = result.data.rows;
			$scope.pager.total=result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var url = '/admin/base/inspectionRecordControl/dataGrid.action';
		http.post(url,$.extend($scope.pager,$scope.searchParam),success,error);
	}
	
	/**
	 * 去编辑
	 */
	$scope.toEdit = function(id){
		$state.go('index.inspectionRecordAdd',{ir_id:id})
	}
	
	/**
	 * 去详情
	 */
	$scope.toDetail = function(id){
		$state.go('index.inspectionRecordDetail',{ir_id:id})
	}
	
	/**
	 * 删除
	 */
	$scope.toDelete = function(id){
		var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			queryInspectionRecord();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		
		var data ={'ir_id':id}
		var url = "/admin/apply/inspectionRecordControl/delete.action";
		var	msg = '您确定修改本条记录吗？';
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {			
			http.post(url, data, success, error);
		}, function() {

		});
		
	}
	
	/**
	 * 条件查询
	 */
	$scope.doSearch = function(){
		if($scope.pager.page!=1){
			$scope.pager.page = 1;
		}
		queryInspectionRecord();
	}
	
	$scope.searchFun = function(){
		if($scope.pager.page==1){
			queryInspectionRecord();
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
	
	/**
	 * 监听
	 */
	$scope.$watch(function(){
		var newValue = $scope.pager.page+' '+$scope.pager.rows+' '+$scope.pager.sort+' '+$scope.pager.order+' ';
		for(var x in $scope.searchParam){
			newValue = newValue + x+'='+$scope.searchParam[x]+'&';
		}
		return newValue;
	},queryInspectionRecord);
	
	$scope.clearParams = function(){
		$scope.searchParam.searchKey = "";
	}
})