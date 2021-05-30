tempApp.controller('ctr_csLineCustomerList', function($scope,
		$state,http,EzConfirm,messageFactory) {
	$scope.pager = {page:1,rows:'10',sort:'clc_id',order:'desc',pageList:['10','20','30']};
	$scope.searchParam = {};
	
	/**
	 * 查询数据
	 */
	var queryCsLineCustomer = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.csLineCustomerList = result.data.rows;
			$scope.pager.total=result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
		}
		var url = '/admin/line/csLineCustomerControl/dataGrid.action';
		http.post(url,$scope.pager,success,error);
	}
	
	/**
	 * 去编辑
	 */
	$scope.toEdit = function(id){
		$state.go('index.csLineCustomerAdd',{clc_id:id})
	}
	
	/**
	 * 去详情
	 */
	$scope.toDetail = function(id){
		$state.go('index.csLineCustomerDetail',{clc_id:id})
	}
	
	/**
	 * 删除
	 */
	$scope.toDelete = function(id){
		var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			queryCsLineCustomer();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		
		var data ={'clc_id':id}
		var url = "/admin/line/csLineCustomerControl/delete.action";
		var	msg = '您确定修改本条记录吗？';
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {			
			http.post(url, data, success, error);
		}, function() {

		});
		
	}
	
	$scope.searchFun = function(){
		if($scope.pager.page==1){
			queryCsLineCustomer();
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
		
		return newValue;
	},queryCsLineCustomer);
})